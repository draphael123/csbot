const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

let documentLoaded = false;
let documentExists = false;

async function checkDocument() {
  if (documentLoaded) return;
  
  try {
    const docPath = path.join(process.cwd(), 'Fountain Workflows (Updated 12_23).docx');
    documentExists = fs.existsSync(docPath);
    documentLoaded = true;
  } catch (error) {
    console.error('Error checking document:', error);
    documentLoaded = true;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await checkDocument();
  
  res.json({ 
    status: 'ok', 
    documentLoaded: documentExists 
  });
};

