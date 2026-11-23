document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú móvil hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // 3. Efecto de scroll en Header y enlace activo
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Filtro interactivo de Galería
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 5. Lightbox para ampliar imágenes de la galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} — ${desc}`;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 6. Formulario de Cotización (Envío directo a WhatsApp o Correo de HA.INDUSTRIAL)
    const quoteForm = document.getElementById('quote-form');
    const sendEmailBtn = document.getElementById('send-email-btn');
    const feedback = document.getElementById('form-feedback');

    function getFormData() {
        return {
            nombre: document.getElementById('nombre').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            email: document.getElementById('email').value.trim() || 'No proporcionado',
            servicio: document.getElementById('servicio').value,
            ubicacion: document.getElementById('ubicacion').value.trim(),
            etapa: document.getElementById('etapa').value,
            descripcion: document.getElementById('descripcion').value.trim()
        };
    }

    if (quoteForm) {
        // Envío por WhatsApp (+52 33 2637 3377)
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getFormData();

            const mensaje =
                `Hola *HA.INDUSTRIAL*, solicito una cotización:\n\n` +
                `• *Nombre:* ${data.nombre}\n` +
                `• *Teléfono:* ${data.telefono}\n` +
                `• *Correo:* ${data.email}\n` +
                `• *Servicio:* ${data.servicio}\n` +
                `• *Ubicación de obra:* ${data.ubicacion}\n` +
                `• *Etapa:* ${data.etapa}\n` +
                `• *Detalles:* ${data.descripcion}`;

            const whatsappUrl = `https://wa.me/523326373377?text=${encodeURIComponent(mensaje)}`;
            feedback.textContent = 'Abriendo WhatsApp con los datos de tu cotización...';
            window.open(whatsappUrl, '_blank', 'noopener');
        });

        // Envío alternativo por Correo Electrónico (ha.industrial@outlook.com)
        if (sendEmailBtn) {
            sendEmailBtn.addEventListener('click', () => {
                if (!quoteForm.checkValidity()) {
                    quoteForm.reportValidity();
                    return;
                }

                const data = getFormData();
                const subject = `Cotización Web: ${data.servicio} - ${data.nombre}`;
                const body =
                    `Solicitud de Cotización - HA.INDUSTRIAL\n\n` +
                    `Nombre: ${data.nombre}\n` +
                    `Teléfono / WhatsApp: ${data.telefono}\n` +
                    `Correo: ${data.email}\n` +
                    `Servicio requerido: ${data.servicio}\n` +
                    `Ubicación de la obra: ${data.ubicacion}\n` +
                    `Etapa del proyecto: ${data.etapa}\n\n` +
                    `Descripción y medidas:\n${data.descripcion}`;

                const mailtoUrl = `mailto:ha.industrial@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                feedback.textContent = 'Abriendo tu cliente de correo electrónico...';
                window.location.href = mailtoUrl;
            });
        }
    }
});