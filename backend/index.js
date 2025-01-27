

const express = require('express');
const multer = require('multer');
const mammoth = require('mammoth');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { parseDocument } = require('htmlparser2');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/convertFile', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const wordFilePath = req.file.path;
    const result = await mammoth.convertToHtml({ path: wordFilePath });
    const htmlContent = result.value;

    const fontPath = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
    if (!fs.existsSync(fontPath)) {
      return res.status(500).send('Font file not found.');
    }
    const fontBytes = fs.readFileSync(fontPath);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(require('@pdf-lib/fontkit'));
    const customFont = await pdfDoc.embedFont(fontBytes);

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let yPosition = height - 20;

    
    const drawText = (text, options = {}) => {
      if (yPosition < 20) {
        page = pdfDoc.addPage();
        yPosition = height - 20;
      }
      if (text) { 
        page.drawText(text, {
          x: options.indent || 20,
          y: yPosition,
          size: options.size || 12,
          color: options.color || rgb(0, 0, 0),
          font: customFont,
          ...options.extra
        });
        yPosition -= options.lineHeight || 20;
      }
    };

  
    const processNode = (node, indent = 20) => {
      if (node.type === 'text' && node.data) {
        drawText(node.data.trim(), { indent, size: 12 });
      } else if (node.type === 'tag') {
        switch (node.name) {
          case 'strong':
            drawText(node.children?.[0]?.data || '', { indent, size: 12, extra: { font: customFont } });
            break;
          case 'li':
            drawText(`• ${node.children?.[0]?.data || ''}`, { indent: indent + 10, lineHeight: 25 });
            break;
          case 'ol':
          case 'ul':
            node.children.forEach(child => processNode(child, indent + 10));
            break;
          default:
            node.children.forEach(child => processNode(child, indent));
        }
      }
    };

    const doc = parseDocument(htmlContent);
    doc.children.forEach(node => processNode(node));

    const pdfBytes = await pdfDoc.save();
    const outputFilePath = path.join('uploads', 'output.pdf');
    fs.writeFileSync(outputFilePath, pdfBytes);

    res.download(outputFilePath, 'converted.pdf', err => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      fs.unlinkSync(wordFilePath);
      fs.unlinkSync(outputFilePath);
    });

  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).send('An error occurred while converting the file.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send("hello shabi");
});

