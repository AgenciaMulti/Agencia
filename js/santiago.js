const tools = {
  photoshop: [
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/2.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },
    { nombre: "Retoque Digital", src: "docs/retoque-photoshop.pdf", tipo: "pdf", img: "img/banner-santiago.jpg" },

  ],
  illustrator: [
    { nombre: "Diseño de Logotipo", src: "docs/logo-illustrator.pdf", tipo: "pdf", img: "img/ai-thumb.jpg" },
  ],
  maya3d: [
    { nombre: "Escultura Digital", src: "https://skfb.ly/pvrEV", tipo: "iframe", img: "img/maya-thumb.jpg" },
  ]
};

const details = document.getElementById('toolDetails');
const viewerContainer = document.getElementById('viewerContainer');

document.querySelectorAll('.herramientas li').forEach(item => {
  item.addEventListener('click', (e) => {
    const key = item.dataset.tool;
    if (!tools[key]) return;

    details.innerHTML = ''; // limpiar
    

    const grid = document.createElement('div');
    grid.className = 'tool-proyectos';

    tools[key].forEach(p => {
      const card = document.createElement('div');
      card.className = 'proyecto';
      card.innerHTML = `
        <img src="${p.img}" class="miniatura" alt="${p.nombre}" />
        <div class="overlay">
        <div>${p.nombre}</div>
        <button class="view-btn" onclick="showViewer('${p.src}', '${p.tipo}')">Ver Proyecto</button>
        </div>
      `;
      grid.appendChild(card);
    });

    details.appendChild(grid);
    details.appendChild(viewerContainer);
    details.classList.add('active');
    viewerContainer.classList.remove('active');
    viewerContainer.innerHTML = '';
  });
});


function showViewer(src, tipo) {
  const cleanSrc = tipo === 'pdf'
    ? `${src}#toolbar=0&navpanes=0&scrollbar=0`
    : src;

  viewerContainer.innerHTML = `
    <button class="close-viewer" onclick="closeViewer()">✕</button>
    <iframe src="${cleanSrc}" type="application/pdf" allowfullscreen></iframe>
  `;

  viewerContainer.classList.add('active');
  document.body.classList.add('blur-active');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  viewerContainer.classList.remove('active');
  viewerContainer.innerHTML = '';
  document.body.classList.remove('blur-active');
  document.body.style.overflow = '';
}


document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const pdfUrl = this.getAttribute('data-pdf');
      const pdfFrame = document.getElementById('pdfFrame');
      pdfFrame.src = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`; // desactiva descargas
      document.getElementById('pdfViewer').style.display = 'flex';
    });
  });

  document.getElementById('closeViewer').addEventListener('click', function () {
    const viewer = document.getElementById('pdfViewer');
    viewer.style.display = 'none';
    document.getElementById('pdfFrame').src = '';
  });