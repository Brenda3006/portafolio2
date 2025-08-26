/* Nombre: Brenda Alicia Solis Calderon 
      Fecha: 24/08/2025
      Descripcion: Portafolio cv */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.1
});

// slide-up y study cards
document.querySelectorAll('.study-card, .slide-up').forEach(el => {
  observer.observe(el);
});

const bg = document.querySelector('.background');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  bg.style.setProperty('--x', `${x}%`);
  bg.style.setProperty('--y', `${y}%`);
});

function escapeHtml(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/*function actualizarCodigo() {
  const contenido = document.getElementById("contenido");
  const codigo = document.getElementById("codigo");

  const htmlOriginal = contenido.innerHTML.trim();
  const htmlEscapado = escapeHtml(htmlOriginal);

  codigo.innerHTML = htmlEscapado;

  if (window.hljs) {
    hljs.highlightElement(codigo);
  }
}*/

function actualizarBloques() {
  const htmlContenido = document.getElementById("contenido").innerHTML.trim();
  document.getElementById("codigo-html").textContent = escapeHtml(htmlContenido);

  const cssCode = `
#contenido #demo-boton {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#contenido #demo-boton:hover {
  background-color: #0056b3;
}

#contenido #demo-texto {
  margin-top: 10px;
  font-weight: bold;
}
`.trim();

  // Inyecta el CSS en la vista previa
const estiloPrevio = document.getElementById("estilo-previo");
if (estiloPrevio) estiloPrevio.remove(); // elimina si ya existe

const style = document.createElement("style");
style.id = "estilo-previo";
style.innerHTML = cssCode;
document.head.appendChild(style);

  document.getElementById("codigo-css").textContent = cssCode;

  const jsCode = `
document.getElementById("demo-boton").addEventListener("click", function () {
  document.getElementById("demo-texto").textContent = "¡Has hecho clic!";
});
  `.trim();

  document.getElementById("codigo-js").textContent = jsCode;

  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  /*actualizarCodigo();*/
  actualizarBloques();

 // Activar funcionalidad de botón de ejemplo
  const demoBoton = document.getElementById("demo-boton");
  if (demoBoton) {
    demoBoton.addEventListener("click", () => {
      document.getElementById("demo-texto").textContent = "¡Has hecho clic!";
    });
  }


  // Botones de copiar código
  document.querySelectorAll(".btn-copiar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const tipo = boton.dataset.copiar;
      const codigo = document.getElementById(`codigo-${tipo}`).innerText;

      navigator.clipboard.writeText(codigo).then(() => {
        boton.textContent = "✅ ¡Copiado!";
        setTimeout(() => {
          boton.textContent = "📋 Copiar código";
        }, 2000);
      }).catch(() => {
        boton.textContent = "⚠️ Error al copiar";
      });
    });
  });
});
