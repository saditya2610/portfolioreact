import React, { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.type = Math.random() > 0.85 ? 'petal' : 'dust';
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;

                if (this.type === 'dust') {
                    this.size = Math.random() * 2;
                    this.speedY = (Math.random() - 0.5) * 0.3;
                    this.speedX = (Math.random() - 0.5) * 0.3;
                    this.opacity = Math.random() * 0.4;
                    this.color = `rgba(198, 166, 101, ${this.opacity})`;
                } else {
                    this.size = Math.random() * 4 + 3;
                    this.speedY = Math.random() * 1 + 0.5;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.angle = Math.random() * Math.PI * 2;
                    this.angleSpeed = (Math.random() - 0.5) * 0.05;
                    this.sway = Math.random() * 2;
                    this.swaySpeed = Math.random() * 0.05;
                    this.time = Math.random() * 100;
                    const r = 138 + Math.random() * 50;
                    const g = 28 + Math.random() * 20;
                    const b = 28 + Math.random() * 20;
                    this.opacity = 0.6 + Math.random() * 0.4;
                    this.color = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
                }
            }

            update() {
                if (this.type === 'dust') {
                    this.x += this.speedX;
                    this.y += this.speedY;
                } else {
                    this.time += this.swaySpeed;
                    this.x += this.speedX + Math.sin(this.time) * 0.5;
                    this.y += this.speedY;
                    this.angle += this.angleSpeed;
                }

                if (this.x > width + 10 || this.x < -10 || this.y > height + 10 || this.y < -10) {
                    if (this.type === 'petal') {
                        this.y = -10;
                        this.x = Math.random() * width;
                    } else {
                        if (this.x > width) this.x = 0;
                        if (this.x < 0) this.x = width;
                        if (this.y > height) this.y = 0;
                        if (this.y < 0) this.y = height;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;

                if (this.type === 'dust') {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, this.size, this.size / 2.5, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
        }

        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = Math.min(window.innerWidth / 10, 80);
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particlesRef.current.forEach(p => {
                p.update();
                p.draw();
            });
            animationIdRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            resize();
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        resize();
        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
            }}
            id="particle-canvas"
        />
    );
};

export default ParticleCanvas;
