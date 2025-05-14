// Inicializar objetos visuales al cargar la página
window.onload = function() {
    // Primera ley
    const inertiaObject = document.getElementById("inertia-object");
    inertiaObject.style.left = "10px";
    inertiaObject.style.top = "75px";
    
    // Segunda ley
    const dynamicsObject = document.getElementById("dynamics-object");
    dynamicsObject.style.left = "50px";
    dynamicsObject.style.top = "75px";
    
    // Tercera ley
    const actionObject = document.getElementById("action-object");
    actionObject.style.left = "70px";
    actionObject.style.top = "75px";
    
    const reactionObject = document.getElementById("reaction-object");
    reactionObject.style.left = "180px";
    reactionObject.style.top = "75px";
};

// Función para la demostración de la Primera Ley
function runInertiaDemo() {
    const friction = parseFloat(document.getElementById("friction").value);
    const initialVelocity = parseFloat(document.getElementById("initial-velocity").value);
    
    if (isNaN(friction) || isNaN(initialVelocity)) {
        document.getElementById("inertia-result").innerHTML = "<p>Por favor, ingresa valores válidos.</p>";
        return;
    }
    
    const object = document.getElementById("inertia-object");
    object.style.left = "10px";
    object.style.top = "75px";
    
    let velocity = initialVelocity;
    let position = 10;
    
    // Resetear resultado
    document.getElementById("inertia-result").innerHTML = "<p>Simulación en progreso...</p>";
    
    // Limpiar animaciones anteriores
    if (window.inertiaInterval) {
        clearInterval(window.inertiaInterval);
    }
    
    // Animación
    window.inertiaInterval = setInterval(() => {
        // Aplicar fricción
        velocity -= friction * 0.05 * velocity;
        
        // Actualizar posición
        position += velocity * 0.1;
        object.style.left = position + "px";
        
        // Detener si la velocidad es muy baja o el objeto sale del contenedor
        if (velocity < 0.1 || position > document.getElementById("primera-ley-vis").offsetWidth - 50) {
            clearInterval(window.inertiaInterval);
            document.getElementById("inertia-result").innerHTML = `
                <p><strong>Resultados:</strong></p>
                <p>Velocidad final: ${velocity.toFixed(2)} m/s</p>
                <p>Distancia recorrida: ${(position - 10).toFixed(2)} m</p>
                <p>Este es un ejemplo de cómo un objeto en movimiento tiende a permanecer en movimiento,
                pero la fuerza de fricción actúa como una fuerza externa que lo desacelera.</p>
            `;
        }
    }, 50);
}

// Función para la Segunda Ley
function calculateAcceleration() {
    const mass = parseFloat(document.getElementById("mass").value);
    const force = parseFloat(document.getElementById("force").value);
    
    if (isNaN(mass) || isNaN(force) || mass <= 0) {
        document.getElementById("acceleration-result").innerHTML = "<p>Por favor, ingresa valores válidos.</p>";
        return;
    }
    
    const acceleration = force / mass;
    
    // Mostrar resultado
    document.getElementById("acceleration-result").innerHTML = `
        <p><strong>Resultados:</strong></p>
        <p>Aceleración: ${acceleration.toFixed(2)} m/s²</p>
        <p>Fórmula aplicada: F = m·a → a = F/m</p>
    `;
    
    // Animación visual
    const object = document.getElementById("dynamics-object");
    const arrow = document.getElementById("force-arrow");
    
    object.style.left = "50px";
    object.style.top = "75px";
    
    // Mostrar flecha de fuerza
    arrow.style.left = "100px";
    arrow.style.top = "100px";
    arrow.style.width = `${force * 3}px`;
    
    // Limpiar animaciones anteriores
    if (window.accelInterval) {
        clearInterval(window.accelInterval);
    }
    
    // Animar el objeto
    let position = 50;
    let velocity = 0;
    
    window.accelInterval = setInterval(() => {
        velocity += acceleration * 0.1;
        position += velocity * 0.1;
        
        object.style.left = position + "px";
        
        if (position > document.getElementById("segunda-ley-vis").offsetWidth - 50) {
            clearInterval(window.accelInterval);
        }
    }, 50);
}

// Función para la Tercera Ley
function runActionReactionDemo() {
    const actionForce = parseFloat(document.getElementById("action-force").value);
    
    if (isNaN(actionForce) || actionForce <= 0) {
        document.getElementById("action-reaction-result").innerHTML = "<p>Por favor, ingresa un valor válido para la fuerza.</p>";
        return;
    }
    
    const actionObject = document.getElementById("action-object");
    const reactionObject = document.getElementById("reaction-object");
    
    // Posiciones iniciales
    actionObject.style.left = "70px";
    actionObject.style.top = "75px";
    
    reactionObject.style.left = "180px";
    reactionObject.style.top = "75px";
    
    document.getElementById("action-reaction-result").innerHTML = "<p>Simulación en progreso...</p>";
    
    // Limpiar timers anteriores
    if (window.actionTimeout) {
        clearTimeout(window.actionTimeout);
    }
    if (window.actionAnim1) {
        clearInterval(window.actionAnim1);
    }
    if (window.actionAnim2) {
        clearInterval(window.actionAnim2);
    }
    
    // Animación del choque
    window.actionTimeout = setTimeout(() => {
        // Mover objeto de acción
        let pos1 = 70;
        window.actionAnim1 = setInterval(() => {
            pos1 += 5;
            actionObject.style.left = pos1 + "px";
            
            if (pos1 >= 130) {
                clearInterval(window.actionAnim1);
                
                // Después del contacto, ambos objetos se mueven en direcciones opuestas
                let pos1After = 130;
                let pos2After = 180;
                
                window.actionAnim2 = setInterval(() => {
                    pos1After -= (actionForce / 20);
                    pos2After += (actionForce / 20);
                    
                    actionObject.style.left = pos1After + "px";
                    reactionObject.style.left = pos2After + "px";
                    
                    if (pos1After <= 50 || pos2After >= 250) {
                        clearInterval(window.actionAnim2);
                        
                        document.getElementById("action-reaction-result").innerHTML = `
                            <p><strong>Resultados:</strong></p>
                            <p>Fuerza de acción: ${actionForce.toFixed(2)} N</p>
                            <p>Fuerza de reacción: ${-actionForce.toFixed(2)} N</p>
                            <p>La tercera ley de Newton demuestra que ambos objetos experimentan fuerzas iguales pero opuestas durante la colisión.</p>
                        `;
                    }
                }, 50);
            }
        }, 50);
    }, 500);
}

// Cálculo del plano inclinado
function calculateInclinedPlane() {
    const mass = parseFloat(document.getElementById("object-mass").value);
    const angle = parseFloat(document.getElementById("angle").value);
    const frictionCoef = parseFloat(document.getElementById("friction-coef").value);
    
    if (isNaN(mass) || isNaN(angle) || isNaN(frictionCoef) || mass <= 0 || angle < 0 || angle > 90) {
        document.getElementById("inclined-result").innerHTML = "<p>Por favor, ingresa valores válidos.</p>";
        return;
    }
    
    // Conversión a radianes
    const angleRad = angle * Math.PI / 180;
    
    // Calcular componentes
    const gravityForce = mass * 9.8;
    const parallelComponent = gravityForce * Math.sin(angleRad);
    const perpendicularComponent = gravityForce * Math.cos(angleRad);
    const frictionForce = frictionCoef * perpendicularComponent;
    const netForce = parallelComponent - frictionForce;
    
    // Determinar si el objeto se desliza
    let acceleration = 0;
    let willSlide = false;
    
    if (netForce > 0) {
        acceleration = netForce / mass;
        willSlide = true;
    }
    
    // Mostrar resultados
    document.getElementById("inclined-result").innerHTML = `
        <p><strong>Resultados:</strong></p>
        <p>Peso del objeto: ${gravityForce.toFixed(2)} N</p>
        <p>Componente paralela al plano: ${parallelComponent.toFixed(2)} N</p>
        <p>Componente perpendicular al plano: ${perpendicularComponent.toFixed(2)} N</p>
        <p>Fuerza de fricción: ${frictionForce.toFixed(2)} N</p>
        <p>Fuerza neta: ${netForce.toFixed(2)} N</p>
        <p>${willSlide ? 
           `El objeto se deslizará con una aceleración de ${acceleration.toFixed(2)} m/s²` : 
           'El objeto permanece en reposo debido a que la fuerza de fricción es suficiente para contrarrestar la componente paralela del peso'}</p>
    `;
}

// Función para navegación suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});