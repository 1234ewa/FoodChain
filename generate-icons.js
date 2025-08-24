const fs = require('fs');
const path = require('path');

// Crear iconos PNG simples usando Canvas API (si está disponible)
// Para este ejemplo, crearemos archivos placeholder que luego puedes reemplazar
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const createIconContent = (size) => {
  // Crear un SVG simple que se puede convertir a PNG
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="64" fill="#007bff"/>
    <circle cx="256" cy="180" r="60" fill="white"/>
    <rect x="176" y="260" width="160" height="120" rx="20" fill="white"/>
    <rect x="196" y="280" width="120" height="20" rx="10" fill="#007bff"/>
    <rect x="196" y="320" width="80" height="20" rx="10" fill="#007bff"/>
    <circle cx="430" cy="82" r="20" fill="#ffc107"/>
    <circle cx="82" cy="430" r="20" fill="#28a745"/>
    <circle cx="430" cy="430" r="20" fill="#dc3545"/>
  </svg>`;
};

// Crear archivos SVG para cada tamaño
sizes.forEach(size => {
  const svgContent = createIconContent(size);
  fs.writeFileSync(path.join(__dirname, 'public', `icon-${size}x${size}.svg`), svgContent);
  console.log(`Created icon-${size}x${size}.svg`);
});

console.log('Icons generated successfully!');
console.log('Note: Convert these SVG files to PNG using an online converter or image editing software.');
