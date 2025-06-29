const tools = {
  photoshop: [
    {
      nombre: "Proyecto Completo Photoshop",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]

      
    },
    {
      nombre: "Proyecto Completo Photoshop",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "video", src: "videos/demo.mp4" },
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]

      
    },
    {
      nombre: "Proyecto Completo Photoshop",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "video", src: "videos/demo.mp4" },
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]

      
    },
    {
      nombre: "Proyecto Completo Photoshop",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "video", src: "videos/demo.mp4" },
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]

      
    },
    {
      nombre: "Proyecto Completo Photoshop",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "video", src: "videos/demo.mp4" },
        { tipo: "img", src: "img/banner-santiago.jpg" },
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]

      
    }
    
    
  ],

  illustrator: [
    {
      nombre: "Pr ilus",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]
    }
  ],

  maya3d: [
    {
      nombre: "Modelo Maya",
      img: "img/banner-santiago.jpg",
      contenido: [
        { tipo: "img", src: "img/banner-santiago.jpg" }
      ]
    }
  ]
};

const toolLogos = {
  photoshop: 'https://cdn-icons-png.flaticon.com/512/152/152748.png',
  illustrator: 'https://cdn-icons-png.flaticon.com/512/154/154861.png',
  maya3d: 'img/maya.png'
};

const todosProyectos = Object.entries(tools).flatMap(([tool, proyectos]) =>
  proyectos.map(p => ({ ...p, tool }))
);

const todosProyectosContainer = document.getElementById('todosProyectos');
const ordenSelect = document.getElementById('ordenarProyectos');

function renderTodosProyectos(lista) {
  todosProyectosContainer.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'proyecto';
    div.innerHTML = `
      <img src="${p.img}" class="miniatura" alt="${p.nombre}" />
      <div class="overlay">
        <div>${p.nombre}</div>
        <img src="${toolLogos[p.tool]}" class="tag-logo" alt="${p.tool} logo">
        <button class="view-btn" data-contenido='${encodeURIComponent(JSON.stringify(p.contenido))}'>Ver Proyecto</button>
      </div>
    `;
    todosProyectosContainer.appendChild(div);
  });
}

renderTodosProyectos(todosProyectos);



todosProyectosContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('view-btn')) {
    try {
      const contenidoRaw = decodeURIComponent(e.target.getAttribute('data-contenido'));
      const contenido = JSON.parse(contenidoRaw);
      showViewer(contenido);
    } catch (err) {
      console.error("Error al abrir visor:", err);
    }
  }
});


const details = document.getElementById('toolDetails');
const viewerContainer = document.getElementById('viewerContainer');

let activeTool = null;

details.addEventListener('click', function (e) {
  if (e.target.classList.contains('view-btn')) {
    try {
      const contenidoRaw = decodeURIComponent(e.target.getAttribute('data-contenido'));
      const contenido = JSON.parse(contenidoRaw);
      showViewer(contenido);
    } catch (err) {
      console.error("Error al cargar contenido:", err);
    }
  }
});

document.querySelectorAll('.herramientas li').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.dataset.tool;

    // Restaurar todos los botones
    document.querySelectorAll('.herramientas li').forEach(li => {
      const baseText = li.getAttribute('data-label');
      li.innerHTML = baseText;
      li.classList.remove('active-tool');
    });

    // Si ya está abierto, cerramos
    if (activeTool === key) {
      details.classList.remove('active');
      details.style.maxHeight = '0px';
      activeTool = null;
      return;
    }

    // Activar visualmente este
    item.innerHTML = `${item.getAttribute('data-label')} <span class="flecha">▼</span>`;
    item.classList.add('active-tool');

    if (!tools[key]) return;

    details.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'tool-proyectos';

    tools[key].forEach(p => {
    const card = document.createElement('div');
    card.className = 'proyecto';

    card.innerHTML = `
      <img src="${p.img}" class="miniatura" alt="${p.nombre}" />
      <div class="overlay">
        <div>${p.nombre}</div>
        <img src="${toolLogos[key]}" class="tag-logo" alt="${key} logo">
        <button class="view-btn" data-contenido='${encodeURIComponent(JSON.stringify(p.contenido))}'>Ver Proyecto</button>
      </div>
    `;


    grid.appendChild(card);
  });

    details.appendChild(grid);
    viewerContainer.innerHTML = '';
    viewerContainer.classList.remove('active');

    details.classList.add('active');
    details.style.maxHeight = grid.scrollHeight + 200 + 'px';
    activeTool = key;
  });
});

const overlay = document.getElementById('viewerOverlay');

function showViewer(items) {
  let output = '';

  items.forEach(({ tipo, src }) => {
    switch (tipo) {
      case 'pdf':
        output += `<iframe src="${src}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" allowfullscreen></iframe>`;
        break;
      case 'img':
        output += `<img src="${src}" alt="Imagen del proyecto" />`;
        break;
      case 'video':
        output += `<video src="${src}" controls></video>`;
        break;
      case 'iframe':
      default:
        output += `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`;
        break;
    }
  });

  viewerContainer.innerHTML = `
    <button class="close-viewer" onclick="closeViewer()">✕</button>
    <div class="viewer-grid">${output}</div>
  `;
  
  overlay.classList.add('active');
  viewerContainer.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('overlay-active');

  // Asegura que viewer se ajuste si hay poco contenido
  setTimeout(() => {
    const contentHeight = viewerContainer.querySelector('.viewer-grid')?.scrollHeight || 0;
    viewerContainer.style.height = contentHeight < window.innerHeight ? 'auto' : '90vh';
  }, 100);
}

function closeViewer() {
  viewerContainer.classList.remove('active');
  overlay.classList.remove('active');
  viewerContainer.innerHTML = '';
  document.body.style.overflow = '';
  document.body.classList.remove('overlay-active');
}

