import React, { useState, useRef, useEffect } from "react";
import "./LifeSimulator.css";

const LifeSimulator = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [atomCount, setAtomCount] = useState(1000);
  const [gravityBB, setGravityBB] = useState(0);
  const [gravityBR, setGravityBR] = useState(0);
  const [gravityBC, setGravityBC] = useState(0);
  const [gravityBG, setGravityBG] = useState(0);
  const [gravityRR, setGravityRR] = useState(0);
  const [gravityRC, setGravityRC] = useState(0);
  const [gravityRB, setGravityRB] = useState(0);
  const [gravityRG, setGravityRG] = useState(0);
  const [gravityCC, setGravityCC] = useState(0);
  const [gravityCB, setGravityCB] = useState(0);
  const [gravityCR, setGravityCR] = useState(0);
  const [gravityCG, setGravityCG] = useState(0);
  const [gravityGG, setGravityGG] = useState(0);
  const [gravityGB, setGravityGB] = useState(0);
  const [gravityGR, setGravityGR] = useState(0);
  const [gravityGC, setGravityGC] = useState(0);

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  const randomizeGravity = () => {
    setGravityBB(Math.random() * 2 - 1);
    setGravityBR(Math.random() * 2 - 1);
    setGravityBC(Math.random() * 2 - 1);
    setGravityBG(Math.random() * 2 - 1);
    setGravityRR(Math.random() * 2 - 1);
    setGravityRB(Math.random() * 2 - 1);
    setGravityRC(Math.random() * 2 - 1);
    setGravityRG(Math.random() * 2 - 1);
    setGravityCC(Math.random() * 2 - 1);
    setGravityCR(Math.random() * 2 - 1);
    setGravityCB(Math.random() * 2 - 1);
    setGravityCG(Math.random() * 2 - 1);
    setGravityGC(Math.random() * 2 - 1);
    setGravityGR(Math.random() * 2 - 1);
    setGravityGB(Math.random() * 2 - 1);
    setGravityGG(Math.random() * 2 - 1);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    let m, animationFrameId;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      m = canvas.getContext("2d");
    }
    let atoms = [];

    const draw = (x, y, c, s) => {
      m.fillStyle = c;
      m.fillRect(x, y, s, s);
    };

    const atom = (x, y, c) => {
      return { x, y, vx: 0, vy: 0, color: c };
    };

    const random = () => {
      return Math.random() * dimensions.width;
    };

    const create = (number, color) => {
      let group = [];
      for (let i = 0; i < number; i++) {
        group.push(atom(random(), random(), color));
        atoms.push(group[i]);
      }
      return group;
    };

    const rule = (atoms1, atoms2, g) => {
      atoms1.forEach((a) => {
        let fx = 0;
        let fy = 0;
        atoms2.forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 0 && d < 180) {
            const F = (g * 1) / d;
            fx += F * dx;
            fy += F * dy;
          }
        });
        a.vx = (a.vx + fx) * 0.5;
        a.vy = (a.vy + fy) * 0.5;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= dimensions.width) a.vx *= -1;
        if (a.y <= 0 || a.y >= dimensions.height) a.vy *= -1;
      });
    };

    const cyan = create(atomCount, "cyan");
    const red = create(atomCount, "red");
    const blue = create(atomCount, "blue");
    const green = create(atomCount, "green");

    const update = () => {
      rule(blue, blue, gravityBB);
      rule(blue, red, gravityBR);
      rule(blue, cyan, gravityBC);
      rule(blue, green, gravityBG);
      rule(red, red, gravityRR);
      rule(red, blue, gravityRB);
      rule(red, cyan, gravityRC);
      rule(red, green, gravityRG);
      rule(cyan, cyan, gravityCC);
      rule(cyan, blue, gravityCB);
      rule(cyan, red, gravityCR);
      rule(cyan, green, gravityCG);
      rule(green, cyan, gravityGC);
      rule(green, blue, gravityGB);
      rule(green, red, gravityGR);
      rule(green, green, gravityGG);

      m.clearRect(0, 0, dimensions.width, dimensions.height);
      draw(0, 0, "black", dimensions.width);

      atoms.forEach((atom) => {
        draw(atom.x, atom.y, atom.color, 5);
      });
      
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      m.clearRect(0, 0, dimensions.width, dimensions.height);
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
  };
  }, [
    dimensions,
    atomCount,
    gravityBB,
    gravityBR,
    gravityBC,
    gravityRR,
    gravityRB,
    gravityRC,
    gravityCC,
    gravityCR,
    gravityCB,
    gravityGG,
    gravityGB,
    gravityGR,
    gravityGC,
  ]);

  return (
    <div className="page-container">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
      </div>
      <div className="controls">
        <button onClick={randomizeGravity}>Randomize</button>
        <label className="gravity-exp">
          <p>
            Gravity sliders go from max attraction (left) to max repelling force
            (right)
          </p>
        </label>
        <div className="button-container">
          <div className="atomcount">
            <label>
              Atom Count:
              <input
                type="range"
                min="500"
                max="1500"
                value={atomCount}
                onChange={(e) => setAtomCount(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
        <div className="blue-controls">
          <label>
            Gravity (Blue-Blue):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityBB}
              onChange={(e) => setGravityBB(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Blue-Red):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityBR}
              onChange={(e) => setGravityBR(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Blue-Cyan):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityBC}
              onChange={(e) => setGravityBC(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Blue-Green):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityBG}
              onChange={(e) => setGravityBG(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="red-controls">
          <label>
            Gravity (Red-Red):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityRR}
              onChange={(e) => setGravityRR(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Red-Blue):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityRB}
              onChange={(e) => setGravityRB(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Red-Cyan):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityRC}
              onChange={(e) => setGravityRC(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Red-Green):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityRG}
              onChange={(e) => setGravityRG(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="cyan-controls">
          <label>
            Gravity (Cyan-Cyan):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityCC}
              onChange={(e) => setGravityCC(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Cyan-Blue):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityCB}
              onChange={(e) => setGravityCB(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Cyan-Red):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityCR}
              onChange={(e) => setGravityCR(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Cyan-Green):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityCG}
              onChange={(e) => setGravityCG(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="green-controls">
          <label>
            Gravity (Green-Green):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityGG}
              onChange={(e) => setGravityGG(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Green-Blue):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityGB}
              onChange={(e) => setGravityGB(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Green-Red):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityGR}
              onChange={(e) => setGravityGR(Number(e.target.value))}
            />
          </label>
          <label>
            Gravity (Green-Cyan):
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravityGC}
              onChange={(e) => setGravityGC(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LifeSimulator;
