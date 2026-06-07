import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, ArrowRight, Eye, Layers, GitCommit, Sliders, ChevronRight, Activity, Hammer, Lightbulb, RotateCw, Zap, Disc } from "lucide-react";

// ============================================================================
// 1. Numerical Methods Simulator
// ============================================================================
export function NumericalMethodsSimulator() {
  const [eqChoice, setEqChoice] = useState<number>(0);
  const [startX, setStartX] = useState<number>(2.0);
  const [method, setMethod] = useState<"newton" | "bisection">("newton");
  const [iterations, setIterations] = useState<Array<{ step: number; xVal: number; yVal: number; error: number }>>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(2.0);

  // List of functions: f(x) and its derivative f'(x)
  const equations = [
    {
      label: "f(x) = x³ - x - 2 = 0",
      f: (x: number) => x * x * x - x - 2,
      df: (x: number) => 3 * x * x - 1,
      target: 1.5213797,
      range: [1.0, 2.5] as [number, number]
    },
    {
      label: "f(x) = cos(x) - x = 0",
      f: (x: number) => Math.cos(x) - x,
      df: (x: number) => -Math.sin(x) - 1,
      target: 0.7390851,
      range: [0.0, 1.5] as [number, number]
    },
    {
      label: "f(x) = e^(-x) - x = 0",
      f: (x: number) => Math.exp(-x) - x,
      df: (x: number) => -Math.exp(-x) - 1,
      target: 0.56714329,
      range: [0.0, 1.5] as [number, number]
    }
  ];

  const activeEq = equations[eqChoice];

  // Initialize calculations
  useEffect(() => {
    resetSolver();
  }, [eqChoice, method, startX]);

  const resetSolver = () => {
    setCurrentX(startX);
    setCurrentStep(0);
    
    // Compute whole sequence for display
    let steps = [];
    if (method === "newton") {
      let x = startX;
      let prevX = x;
      for (let i = 0; i < 10; i++) {
        let y = activeEq.f(x);
        let error = Math.abs(x - activeEq.target);
        steps.push({ step: i, xVal: x, yVal: y, error });
        let dy = activeEq.df(x);
        if (Math.abs(dy) < 1e-12) break;
        x = x - y / dy;
      }
    } else {
      // Bisection over [range[0], range[1]]
      let a = activeEq.range[0];
      let b = activeEq.range[1];
      for (let i = 0; i < 10; i++) {
        let mid = (a + b) / 2;
        let y = activeEq.f(mid);
        let error = Math.abs(mid - activeEq.target);
        steps.push({ step: i, xVal: mid, yVal: y, error });
        if (activeEq.f(a) * y < 0) {
          b = mid;
        } else {
          a = mid;
        }
      }
    }
    setIterations(steps);
  };

  const handleNextStep = () => {
    if (currentStep < iterations.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentX(iterations[currentStep + 1].xVal);
    }
  };

  const activeStepData = iterations[currentStep] || { xVal: currentX, yVal: 0, error: 0 };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <h4 className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">interactive laboratory 01</h4>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">Numerical Roots Visualizer</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMethod("newton")}
            className={`px-3 py-1 text-xs rounded-md font-mono transition-colors ${method === "newton" ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200"}`}
          >
            Newton-Raphson
          </button>
          <button
            onClick={() => setMethod("bisection")}
            className={`px-3 py-1 text-xs rounded-md font-mono transition-colors ${method === "bisection" ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200"}`}
          >
            Bisection Method
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Parameters */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Target Equation</label>
            <div className="flex flex-col gap-1.5">
              {equations.map((eq, i) => (
                <button
                  key={i}
                  onClick={() => setEqChoice(i)}
                  className={`w-full text-left p-2.5 rounded-lg border font-mono text-xs transition px-3 ${eqChoice === i ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300 hover:border-zinc-300"}`}
                >
                  {eq.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Initial Guess (x₀) = {startX}</label>
            <input
              type="range"
              min={activeEq.range[0]}
              max={activeEq.range[1]}
              step="0.1"
              value={startX}
              onChange={(e) => setStartX(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
            />
            <div className="flex justify-between font-mono text-[10px] text-zinc-400">
              <span>Min: {activeEq.range[0]}</span>
              <span>Max: {activeEq.range[1]}</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h5 className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Iteration Stats</h5>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Step:</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold">{currentStep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Current x_k:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{activeStepData.xVal.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Current f(x_k):</span>
                <span className="text-zinc-800 dark:text-zinc-300">{activeStepData.yVal.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Absolute Error:</span>
                <span className="text-amber-600 dark:text-amber-400">{activeStepData.error.toExponential(4)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleNextStep}
              disabled={currentStep >= iterations.length - 1}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 duration-150 disabled:bg-zinc-200 disabled:dark:bg-zinc-800 disabled:text-zinc-400 text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-mono font-bold"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setCurrentStep(0); setCurrentX(startX); }}
              className="p-2 border border-zinc-200 dark:border-zinc-800 text-zinc-655 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Graph/Visualization */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-[#151517] h-64 relative overflow-hidden flex items-center justify-center">
            {/* SVG Plotting of Equation */}
            <svg className="w-full h-full p-4" viewBox="0 0 400 200">
              {/* x-axis & y-axis */}
              <line x1="20" y1="130" x2="380" y2="130" stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="150" y1="10" x2="150" y2="190" stroke="#888" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Function Curve */}
              <path
                d={Array.from({ length: 100 }, (_, i) => {
                  let ratio = i / 99;
                  let x = activeEq.range[0] + ratio * (activeEq.range[1] - activeEq.range[0]);
                  let yVal = activeEq.f(x);
                  // transform to svg coordinates
                  let svgX = 20 + ratio * 360;
                  let svgY = 130 - yVal * 25; // Scale factor for visual fit
                  return `${i === 0 ? "M" : "L"} ${svgX} ${svgY}`;
                }).join(" ")}
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
              />

              {/* Solved Target (The actual root) */}
              {(() => {
                let targetRatio = (activeEq.target - activeEq.range[0]) / (activeEq.range[1] - activeEq.range[0]);
                let targetSvgX = 20 + targetRatio * 360;
                return (
                  <circle cx={targetSvgX} cy="130" r="4" fill="#10B981" />
                );
              })()}

              {/* Current iteration point and tangent/interval projection */}
              {(() => {
                let currentRatio = (currentX - activeEq.range[0]) / (activeEq.range[1] - activeEq.range[0]);
                let currentSvgX = 20 + currentRatio * 360;
                let currentSvgY = 130 - activeStepData.yVal * 25;

                return (
                  <>
                    {/* Path line downwards */}
                    <line x1={currentSvgX} y1={currentSvgY} x2={currentSvgX} y2="130" stroke="#EF4444" strokeWidth="1" strokeDasharray="3,3" />
                    {/* Tangent Slope line for Newton */}
                    {method === "newton" && currentStep < iterations.length - 1 && (
                      (() => {
                        let dy = activeEq.df(currentX);
                        // solve line equation from point: tangent line equation
                        let nextX = currentX - activeStepData.yVal / dy;
                        let nextRatio = (nextX - activeEq.range[0]) / (activeEq.range[1] - activeEq.range[0]);
                        let nextSvgX = 20 + nextRatio * 360;
                        return (
                          <line x1={currentSvgX} y1={currentSvgY} x2={nextSvgX} y2="130" stroke="#EF4444" strokeWidth="1" />
                        );
                      })()
                    )}
                    {/* Visual Point */}
                    <circle cx={currentSvgX} cy={currentSvgY} r="5" fill="#EF4444" />
                  </>
                );
              })()}

              <text x="370" y="125" className="font-mono text-[8px] fill-zinc-400" textAnchor="end">X-AXIS</text>
              <text x="155" y="20" className="font-mono text-[8px] fill-zinc-400">F(X)-AXIS</text>
              <text x="20" y="190" className="font-mono text-[9px] fill-emerald-600 dark:fill-emerald-400 font-bold">• Green denotes analytical root</text>
              <text x="380" y="190" className="font-mono text-[9px] fill-red-500 font-bold" textAnchor="end">• Red is trace index</text>
            </svg>
          </div>

          {/* Iteration Sequence Matrix */}
          <div className="border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400">
                  <th className="p-2 pl-3">Iteration</th>
                  <th className="p-2">x_k</th>
                  <th className="p-2">f(x_k)</th>
                  <th className="p-2 text-right pr-3">Error (Absolute)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                {iterations.slice(0, currentStep + 1).map((stepData) => (
                  <tr
                    key={stepData.step}
                    className={`${stepData.step === currentStep ? "bg-blue-50/40 dark:bg-blue-950/10 font-bold" : "text-zinc-500"}`}
                  >
                    <td className="p-2 pl-3">#{stepData.step}</td>
                    <td className="p-2">{stepData.xVal.toFixed(6)}</td>
                    <td className="p-2">{stepData.yVal.toFixed(6)}</td>
                    <td className="p-2 text-right pr-3">{stepData.error.toExponential(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. 2D Vehicle Dynamics Simulator (Bicycle Model)
// ============================================================================
export function VehicleDynamicsSimulator() {
  const [speed, setSpeed] = useState<number>(15); // u in m/s
  const [wheelbase, setWheelbase] = useState<number>(2.5); // L in meters
  const [stiffness, setStiffness] = useState<number>(40000); // Cf & Cr tire stiffness
  const [mass, setMass] = useState<number>(1200); // m in kg
  const [steeringAngle, setSteeringAngle] = useState<number>(0.1); // delta in radians
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // States
  const [yawRate, setYawRate] = useState<number>(0); // r (rad/s)
  const [latVelocity, setLatVelocity] = useState<number>(0); // v (m/s)
  const [posX, setPosX] = useState<number>(150);
  const [posY, setPosY] = useState<number>(100);
  const [heading, setHeading] = useState<number>(0); // rad
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics simulation loop (60Hz)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Vehicle parameters
      const a = wheelbase * 0.45; // distance from CG to front axle
      const b = wheelbase * 0.55; // distance from CG to rear axle
      const Iz = 1500; // Yaw moment of inertia (kg*m^2)

      const Cf = stiffness;
      const Cr = stiffness;

      // Tire Slip angle approximations
      // alpha_f = delta - (v + a*r)/u
      const alpha_f = steeringAngle - (latVelocity + a * yawRate) / speed;
      // alpha_r = - (v - b*r)/u
      const alpha_r = -(latVelocity - b * yawRate) / speed;

      // Tire forces
      const Fyf = Cf * alpha_f;
      const Fyr = Cr * alpha_r;

      // Equations of motion integration
      // mv_dot = Fyf + Fyr - m*u*r
      const dot_v = (Fyf + Fyr) / mass - speed * yawRate;
      // Iz*r_dot = a*Fyf - b*Fyr
      const dot_r = (a * Fyf - b * Fyr) / Iz;

      // Simple Euler Integration
      const dt = 0.033; // 33ms step
      const nextLatV = latVelocity + dot_v * dt;
      const nextYawRate = yawRate + dot_r * dt;

      setLatVelocity(nextLatV);
      setYawRate(nextYawRate);

      // Coordinates updates
      // global dx = u*cos(heading) - v*sin(heading)
      // global dy = u*sin(heading) + v*cos(heading)
      const dx = speed * Math.cos(heading) - nextLatV * Math.sin(heading);
      const dy = speed * Math.sin(heading) + nextLatV * Math.cos(heading);

      const nextHeading = (heading + nextYawRate * dt) % (2 * Math.PI);
      setHeading(nextHeading);

      setPosX((prev) => {
        let x = prev + dx * dt * 8; // scaled for canvas
        if (x > 380) x = 20;
        if (x < 10) x = 370;
        return x;
      });

      setPosY((prev) => {
        let y = prev + dy * dt * 8; // scaled for canvas
        if (y > 180) y = 20;
        if (y < 10) y = 170;
        return y;
      });

    }, 33);

    return () => clearInterval(interval);
  }, [isRunning, speed, wheelbase, stiffness, mass, steeringAngle, latVelocity, yawRate, heading]);

  // Trail logger
  useEffect(() => {
    setTrail((prev) => {
      const updated = [...prev, { x: posX, y: posY }];
      if (updated.length > 50) updated.shift();
      return updated;
    });
  }, [posX, posY]);

  // Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw grid
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(100, 100, 100, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw trajectory trail
    if (trail.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(37, 99, 235, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let p of trail) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Draw Simple vehicle representation block
    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(heading);

    // Chassis card block
    ctx.fillStyle = "#2563EB";
    ctx.fillRect(-15, -7, 30, 14);

    // Axles
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, -9);
    ctx.lineTo(10, 9);
    ctx.moveTo(-10, -9);
    ctx.lineTo(-10, 9);
    ctx.stroke();

    // Front steered wheels (delta angle)
    ctx.fillStyle = "#333";
    ctx.save();
    ctx.translate(10, -9);
    ctx.rotate(steeringAngle);
    ctx.fillRect(-4, -1.5, 8, 3);
    ctx.restore();

    ctx.save();
    ctx.translate(10, 9);
    ctx.rotate(steeringAngle);
    ctx.fillRect(-4, -1.5, 8, 3);
    ctx.restore();

    // Rear wheels
    ctx.fillStyle = "#333";
    ctx.fillRect(-14, -10.5, 8, 3);
    ctx.fillRect(-14, 7.5, 8, 3);

    // Speed vector arrow
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(25, 0);
    ctx.moveTo(25, 0);
    ctx.lineTo(20, -3);
    ctx.moveTo(25, 0);
    ctx.lineTo(20, 3);
    ctx.stroke();

    ctx.restore();
  }, [posX, posY, heading, steeringAngle, trail]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
        <div>
          <h4 className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">interactive laboratory 02</h4>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">2D Bicycle Model Dynamics</h3>
        </div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${isRunning ? "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {isRunning ? (
            <>
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Pause Sim
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Start Sim
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Parameters control */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Velocity (u)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{speed} m/s</span>
            </label>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Steering Feed (δ)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{(steeringAngle * 57.29).toFixed(1)}°</span>
            </label>
            <input
              type="range"
              min="-0.4"
              max="0.4"
              step="0.02"
              value={steeringAngle}
              onChange={(e) => setSteeringAngle(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Vehicles Mass (m)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{mass} kg</span>
            </label>
            <input
              type="range"
              min="800"
              max="2000"
              step="50"
              value={mass}
              onChange={(e) => setMass(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Cornering Stiffness (C_α)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{stiffness / 1000} kN/rad</span>
            </label>
            <input
              type="range"
              min="20000"
              max="80000"
              step="2000"
              value={stiffness}
              onChange={(e) => setStiffness(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg mt-2">
            <h5 className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Live Kinematics Vectors</h5>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Yaw Rate (r):</span>
                <span className="text-zinc-850 dark:text-zinc-200">{yawRate.toFixed(4)} rad/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Lateral Drift (v):</span>
                <span className="text-zinc-850 dark:text-zinc-200">{latVelocity.toFixed(4)} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">CG Coordinate (X,Y):</span>
                <span className="text-blue-500">{posX.toFixed(1)}, {posY.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: HTML5 Canvas screen */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#111112]">
            <canvas
              ref={canvasRef}
              width={500}
              height={220}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
            * <strong>Yaw Control Loop:</strong> The gold vector arrow visualizes speed and instant inertial trajectory heading. Notice how high values of velocity coupled with rapid steering angles generate severe lateral slip offsets, creating oversteer characteristics.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. Vision-Guided Robotic Pick and Place Simulator
// ============================================================================
export function RoboticVisionSimulator() {
  const [filterMode, setFilterMode] = useState<"source" | "chroma" | "edges">("source");
  const [threshold, setThreshold] = useState<number>(128);
  const [targets, setTargets] = useState<Array<{ id: number; cx: number; cy: number; radius: number; color: string; label: string; active: boolean }>>([
    { id: 1, cx: 80, cy: 70, radius: 10, color: "rgb(239, 68, 68)", label: "Red Ball", active: true },
    { id: 2, cx: 220, cy: 110, radius: 12, color: "rgb(37, 99, 235)", label: "Azure Gear", active: true },
    { id: 3, cx: 160, cy: 40, radius: 8, color: "rgb(16, 185, 129)", label: "Green Nut", active: true },
    { id: 4, cx: 130, cy: 150, radius: 6, color: "rgb(245, 158, 11)", label: "Amber Washer", active: true }
  ]);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(1);
  const [visionLog, setVisionLog] = useState<string[]>(["[Calibrated] Afine Matrix generated successfully."]);

  const activeTargetObj = targets.find(t => t.id === selectedTarget) || targets[0];

  const triggerPick = (targetId: number) => {
    const target = targets.find(t => t.id === targetId);
    if (!target) return;

    // Affine transformation mapping (scale = 0.25, R = identity, T = offset)
    const worldX = (target.cx * 0.22 - 10).toFixed(2);
    const worldY = (target.cy * 0.22 - 5).toFixed(2);

    setVisionLog((prev) => [
      `[MOMENT] Centroid isolated at px (${target.cx}, ${target.cy})`,
      `[TRANSFORM] Remapped coordinate to World [X: ${worldX}mm, Y: ${worldY}mm]`,
      `[COMMAND] Triggering Pneumatic Pick & Place sequence for [${target.label}]`,
      ...prev
    ].slice(0, 5));

    // Deselect picked target briefly
    setTargets(prev => prev.map(t => t.id === targetId ? { ...t, active: false } : t));
    setTimeout(() => {
      setTargets(prev => prev.map(t => t.id === targetId ? { ...t, active: true } : t));
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
        <div>
          <h4 className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">interactive laboratory 03</h4>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">Coordinate Affine Vision Feed</h3>
        </div>
        <div className="flex gap-1 border border-zinc-200 dark:border-zinc-800 p-0.5 rounded-lg bg-zinc-50 dark:bg-zinc-900">
          <button
            onClick={() => setFilterMode("source")}
            className={`px-2 py-1 text-[10px] uppercase font-mono rounded-md ${filterMode === "source" ? "bg-white dark:bg-zinc-805 text-zinc-900 dark:text-white shadow-xs font-bold" : "text-zinc-400"}`}
          >
            Source FEED
          </button>
          <button
            onClick={() => setFilterMode("chroma")}
            className={`px-2 py-1 text-[10px] uppercase font-mono rounded-md ${filterMode === "chroma" ? "bg-white dark:bg-zinc-805 text-zinc-900 dark:text-white shadow-xs font-bold" : "text-zinc-400"}`}
          >
            Threshold (B/W)
          </button>
          <button
            onClick={() => setFilterMode("edges")}
            className={`px-2 py-1 text-[10px] uppercase font-mono rounded-md ${filterMode === "edges" ? "bg-white dark:bg-zinc-805 text-zinc-900 dark:text-white shadow-xs font-bold" : "text-zinc-400"}`}
          >
            Canny Segments
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: interactive monitor screen */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Target Object Isolation Filter</label>
            <div className="space-y-1">
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTarget(t.id)}
                  className={`w-full text-left p-2.5 px-3 rounded-lg border font-mono text-xs transition flex justify-between items-center ${selectedTarget === t.id ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:border-zinc-300"}`}
                >
                  <span className="flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></span>
                    {t.label}
                  </span>
                  <span>Px: ({t.cx},{t.cy})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Alpha Threshold Limit</span>
              <span>{threshold} / 255</span>
            </label>
            <input
              type="range"
              min="20"
              max="230"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <button
            onClick={() => triggerPick(selectedTarget || 1)}
            disabled={!activeTargetObj.active}
            className="w-full py-2.5 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono font-bold rounded-lg hover:bg-zinc-800 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Hammer className="w-4 h-4" /> Resolve & Compute Pick
          </button>
        </div>

        {/* Right Side: Visual Camera Grid */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="aspect-video w-full border border-zinc-200 dark:border-zinc-800 rounded-lg bg-[#fafafa] dark:bg-[#121213] relative overflow-hidden flex items-center justify-center">
            {/* Mock camera lens bounds */}
            <div className="absolute inset-4 border border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none"></div>

            <svg className="w-full h-full" viewBox="0 0 300 180">
              {/* Background filter styling based on threshold selection */}
              {filterMode === "chroma" && (
                <rect width="300" height="180" fill="#000" />
              )}
              {filterMode === "edges" && (
                <rect width="300" height="180" fill="#111" />
              )}

              {/* Targets Rendering */}
              {targets.map((t) => {
                if (!t.active) return null;

                if (filterMode === "chroma") {
                  // White high contrast circles
                  return (
                    <circle
                      key={t.id}
                      cx={t.cx}
                      cy={t.cy}
                      r={t.radius}
                      fill="#FFF"
                      className="cursor-pointer"
                      onClick={() => setSelectedTarget(t.id)}
                    />
                  );
                } else if (filterMode === "edges") {
                  return (
                    <circle
                      key={t.id}
                      cx={t.cx}
                      cy={t.cy}
                      r={t.radius}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                      className="cursor-pointer"
                      onClick={() => setSelectedTarget(t.id)}
                    />
                  );
                } else {
                  return (
                    <g key={t.id} className="cursor-pointer" onClick={() => setSelectedTarget(t.id)}>
                      <circle cx={t.cx} cy={t.cy} r={t.radius} fill={t.color} opacity="0.85" />
                      {/* Subtitle indices */}
                      <text x={t.cx} y={t.cy - t.radius - 2} className="font-mono text-[7px] text-zinc-500 fill-zinc-500" textAnchor="middle">
                        ID: {t.id}
                      </text>
                    </g>
                  );
                }
              })}

              {/* Target Centroid Crosshair HUD if selected */}
              {activeTargetObj.active && (
                <g>
                  {/* Cyan Target Ring */}
                  <circle cx={activeTargetObj.cx} cy={activeTargetObj.cy} r={activeTargetObj.radius + 6} fill="none" stroke="#2563EB" strokeWidth="0.75" strokeDasharray="3,3" />
                  {/* Crosshairs lines */}
                  <line x1={activeTargetObj.cx - 20} y1={activeTargetObj.cy} x2={activeTargetObj.cx + 20} y2={activeTargetObj.cy} stroke="#2563EB" strokeWidth="0.5" />
                  <line x1={activeTargetObj.cx} y1={activeTargetObj.cy - 20} x2={activeTargetObj.cx} y2={activeTargetObj.cy + 20} stroke="#2563EB" strokeWidth="0.5" />
                  {/* Moments label pin */}
                  <rect x={activeTargetObj.cx + activeTargetObj.radius + 4} y={activeTargetObj.cy - 12} width="58" height="20" rx="3" fill="rgba(37, 99, 235, 0.9)" />
                  <text x={activeTargetObj.cx + activeTargetObj.radius + 8} y={activeTargetObj.cy - 4} className="font-mono text-[6px] fill-white" fontWeight="bold">X: {activeTargetObj.cx}px</text>
                  <text x={activeTargetObj.cx + activeTargetObj.radius + 8} y={activeTargetObj.cy + 4} className="font-mono text-[6px] fill-white" fontWeight="bold">Y: {activeTargetObj.cy}px</text>
                </g>
              )}
            </svg>

            {/* Simulated Workspace bounds corner accents */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-400">[CAM_SOURCE 01]</div>
            <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-400">FRAME_DIFF_MODE: {filterMode.toUpperCase()}</div>
          </div>

          {/* Vision logs terminal */}
          <div className="bg-zinc-900 border border-zinc-850 dark:border-zinc-800 rounded-lg p-3 text-zinc-300 font-mono text-[10px] h-28 overflow-y-auto space-y-1 scrollbar-hidden">
            {visionLog.map((log, index) => (
              <div key={index} className="flex gap-2 leading-relaxed">
                <span className="text-zinc-600">[{index}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. IK Solver (3-Joint Mechanical Link Simulator)
// ============================================================================
export function KinematicsSolverSimulator() {
  const [l1, setL1] = useState<number>(80);
  const [l2, setL2] = useState<number>(70);
  const [target, setTarget] = useState<{ x: number; y: number }>({ x: 90, y: 50 });
  const [angles, setAngles] = useState<{ theta1: number; theta2: number }>({ theta1: 0, theta2: 0 });
  const [isInteractive, setIsInteractive] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Compute angles analytically (2R linkage planar Inverse Kinematics)
  useEffect(() => {
    // Solve using cosine rules
    // d = sqrt(x^2 + y^2)
    const { x, y } = target;
    const d2 = x * x + y * y;
    const d = Math.sqrt(d2);

    // Reachability check
    if (d > l1 + l2) {
      // Scale coordinates back to reachable workspace limit edge
      const scale = (l1 + l2 - 0.1) / d;
      const rx = x * scale;
      const ry = y * scale;
      solveTrigonometry(rx, ry);
    } else if (d < Math.abs(l1 - l2)) {
      // Minimum reachable boundary check
      const scale = Math.abs(l1 - l2 + 0.1) / d;
      const rx = x * scale;
      const ry = y * scale;
      solveTrigonometry(rx, ry);
    } else {
      solveTrigonometry(x, y);
    }
  }, [target, l1, l2]);

  const solveTrigonometry = (tx: number, ty: number) => {
    // cos(theta2) = (x^2 + y^2 - l1^2 - l2^2) / (2 * l1 * l2)
    const cosTheta2 = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
    // restrict bounds
    const clampedCos2 = Math.max(-1, Math.min(1, cosTheta2));
    const theta2Val = Math.acos(clampedCos2); // Elbow coordinates up model

    // theta1 = atan2(y, x) - atan2(l2 * sin(theta2), l1 + l2 * cos(theta2))
    const theta1Val = Math.atan2(ty, tx) - Math.atan2(l2 * Math.sin(theta2Val), l1 + l2 * Math.cos(theta2Val));

    setAngles({
      theta1: theta1Val,
      theta2: theta2Val
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Origin is at joint 0: bottom center of canvas bounds (x: 200, y: 170)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // convert to link coords (origin x=200, y=170, with y-up inversion)
    const tx = mouseX - 250;
    const ty = 170 - mouseY;

    setTarget({ x: tx, y: ty });
  };

  // Convert solved coordinate markers for SVG rendering
  // Joint 0: (250, 170)
  // Joint 1: (250 + l1*cos(theta1), 170 - l1*sin(theta1))
  // End Effector: (250 + l1*cos(theta1) + l2*cos(theta1+theta2), 170 - l1*sin(theta1) - l2*sin(theta1+theta2))
  const x1 = 250 + l1 * Math.cos(angles.theta1);
  const y1 = 170 - l1 * Math.sin(angles.theta1);

  const x2 = x1 + l2 * Math.cos(angles.theta1 + angles.theta2);
  const y2 = y1 - l2 * Math.sin(angles.theta1 + angles.theta2);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
        <div>
          <h4 className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">interactive laboratory 04</h4>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">Planar 2-DOF Robotic Arm Solver</h3>
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5"></span>
          <span className="font-mono text-[10px] text-zinc-400 uppercase">Interactive Target Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side Controls: Parameters */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Proximal Link Length (l₁)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{l1}mm</span>
            </label>
            <input
              type="range"
              min="50"
              max="110"
              step="5"
              value={l1}
              onChange={(e) => setL1(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Distal Link Length (l₂)</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{l2}mm</span>
            </label>
            <input
              type="range"
              min="40"
              max="100"
              step="5"
              value={l2}
              onChange={(e) => setL2(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h5 className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2.5">Kinematic Coordinate Out</h5>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Target (X, Y):</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold">({target.x.toFixed(1)}mm, {target.y.toFixed(1)}mm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Base Angle (θ₁):</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{(angles.theta1 * 57.29).toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Elbow Angle (θ₂):</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{(angles.theta2 * 57.29).toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Euler Reach State:</span>
                <span className={Math.sqrt(target.x * target.x + target.y * target.y) > l1+l2 ? "text-red-500 font-bold" : "text-emerald-500 font-bold"}>
                  {Math.sqrt(target.x * target.x + target.y * target.y) > l1+l2 ? "OVER-EXTENDED" : "SOLVED"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 select-none">
            * <strong>Dynamic Target Locking:</strong> Move your mouse or drag over the workspace canvas to watch the links solve spatial trigonometry calculations instantly.
          </div>
        </div>

        {/* Right Side Screen: Physical link draw bounds */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-64 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-[#121213] relative overflow-hidden flex items-center justify-center cursor-crosshair"
          >
            <svg className="w-full h-full" viewBox="0 0 500 200">
              {/* Reachable boundary ring overlay */}
              <circle cx="250" cy="170" r={l1 + l2} fill="none" stroke="rgba(37, 99, 235, 0.08)" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="250" cy="170" r={Math.abs(l1 - l2)} fill="none" stroke="rgba(239, 68, 68, 0.08)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Base Joint 0 Pin */}
              <g>
                <circle cx="250" cy="170" r="10" fill="#111" />
                <circle cx="250" cy="170" r="4" fill="#FFF" />
              </g>

              {/* Solved link segment lines */}
              <line x1="250" y1="170" x2={x1} y2={y1} stroke="#111111" strokeWidth="6" strokeLinecap="round" />
              <line x1="250" y1="170" x2={x1} y2={y1} stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#111111" strokeWidth="4.5" strokeLinecap="round" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />

              {/* Elbow Joint 1 Pin */}
              <circle cx={x1} cy={y1} r="6" fill="#111" />
              <circle cx={x1} cy={y1} r="2" fill="#FFF" />

              {/* Tooltip Target marker */}
              <circle cx={250 + target.x} cy={170 - target.y} r="5" fill="none" stroke="#EF4444" strokeWidth="1.5" />
              <line x1={250 + target.x - 7} y1={170 - target.y} x2={250 + target.x + 7} y2={170 - target.y} stroke="#EF4444" strokeWidth="0.75" />
              <line x1={250 + target.x} y1={170 - target.y - 7} x2={250 + target.x} y2={170 - target.y + 7} stroke="#EF4444" strokeWidth="0.75" />

              {/* End Effector Tip */}
              <circle cx={x2} cy={y2} r="4" fill="#10B981" />

              {/* Frame legends */}
              <text x="250" y="192" className="font-mono text-[7px] fill-zinc-400" textAnchor="middle">ARM MOUNT JOINT[0,0]</text>
            </svg>

            <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-400 px-2 py-1 bg-zinc-200/50 dark:bg-zinc-800/55 rounded-sm">TARGET_TRACKER: ENGAGED</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. SLAM Simulation Vector Workspace (LiDAR Mapping & MCL Localization)
// ============================================================================
export function BitmapSolverSimulator() {
  const [robot, setRobot] = useState({ x: 170, y: 170, theta: -Math.PI / 4 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; theta: number; weight: number }>>([]);
  const [scanRays, setScanRays] = useState<Array<{ angle: number; dist: number; hitX: number; hitY: number }>>([]);
  const [isAutoNav, setIsAutoNav] = useState(false);
  const [mappedGrid, setMappedGrid] = useState<boolean[][]>(() =>
    Array(20).fill(null).map(() => Array(20).fill(false))
  );
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Define static wall segments for mapping (maze layout)
  const segments = [
    { x1: 20, y1: 20, x2: 320, y2: 20 },
    { x1: 320, y1: 20, x2: 320, y2: 320 },
    { x1: 320, y1: 320, x2: 20, y2: 320 },
    { x1: 20, y1: 320, x2: 20, y2: 20 },
    // Inner obstacles
    { x1: 80, y1: 80, x2: 260, y2: 80 },
    { x1: 80, y1: 260, x2: 260, y2: 260 },
    { x1: 80, y1: 140, x2: 140, y2: 200 },
    { x1: 260, y1: 140, x2: 200, y2: 200 },
  ];

  // Initialize Monte Carlo Particles around robot's location
  const initParticles = (rx: number, ry: number, rt: number) => {
    const list = [];
    for (let i = 0; i < 60; i++) {
      list.push({
        x: rx + (Math.random() - 0.5) * 45,
        y: ry + (Math.random() - 0.5) * 45,
        theta: rt + (Math.random() - 0.5) * 0.4,
        weight: 1.0
      });
    }
    setParticles(list);
  };

  useEffect(() => {
    initParticles(robot.x, robot.y, robot.theta);
    triggerLiDarSweep(robot.x, robot.y, robot.theta);
  }, []);

  // Ray-segment collision algorithm
  const castRay = (rx: number, ry: number, angle: number) => {
    const rpx = rx;
    const rpy = ry;
    const rdx = Math.cos(angle);
    const rdy = Math.sin(angle);

    let minDist = 300;
    let hitX = rx + rdx * 300;
    let hitY = ry + rdy * 300;

    for (let seg of segments) {
      const spx = seg.x1;
      const spy = seg.y1;
      const sdx = seg.x2 - seg.x1;
      const sdy = seg.y2 - seg.y1;

      const rxs = rdx * sdy - rdy * sdx;
      if (Math.abs(rxs) < 1e-6) continue;

      const t = ((spx - rpx) * rdy - (spy - rpy) * rdx) / rxs;
      const u = ((spx - rpx) * sdy - (spy - rpy) * sdx) / rxs;

      if (u >= 0 && t >= 0 && t <= 1) {
        if (u < minDist) {
          minDist = u;
          hitX = rpx + rdx * u;
          hitY = rpy + rdy * u;
        }
      }
    }
    return { angle, dist: minDist, hitX, hitY };
  };

  const triggerLiDarSweep = (rx: number, ry: number, rt: number) => {
    const beams = 16;
    const sweeps = [];
    for (let i = 0; i < beams; i++) {
      const angle = rt + (i * Math.PI * 2) / beams;
      sweeps.push(castRay(rx, ry, angle));
    }
    setScanRays(sweeps);

    // Update the occupancy grid dynamically based on scanner sweeps
    setMappedGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      sweeps.forEach((sw) => {
        const gridCol = Math.min(19, Math.max(0, Math.floor(sw.hitX / 17)));
        const gridRow = Math.min(19, Math.max(0, Math.floor(sw.hitY / 17)));
        copy[gridRow][gridCol] = true;
      });
      return copy;
    });
  };

  const steerRobot = (dx: number, dy: number, dt: number) => {
    setRobot((prev) => {
      let nx = Math.min(300, Math.max(40, prev.x + dx));
      let ny = Math.min(300, Math.max(40, prev.y + dy));
      let nt = prev.theta + dt;
      
      // Keep inside segments checking
      triggerLiDarSweep(nx, ny, nt);

      // Move particle weights according to motion odometry model (+ noise)
      setParticles((parts) =>
        parts.map((p) => {
          const px = p.x + dx + (Math.random() - 0.5) * 4;
          const py = p.y + dy + (Math.random() - 0.5) * 4;
          const pt = p.theta + dt + (Math.random() - 0.5) * 0.05;
          
          // Calculate importance weighting against measurements
          // Particles closer to actual robot measurements reinforce similarity
          let correlationWeight = 1.0;
          for (let idx = 0; idx < 4; idx++) {
            const beamIdx = idx * 4;
            const rRay = castRay(nx, ny, nt + (beamIdx * Math.PI * 2) / 16);
            const pRay = castRay(px, py, pt + (beamIdx * Math.PI * 2) / 16);
            correlationWeight *= Math.exp(-Math.abs(rRay.dist - pRay.dist) / 15);
          }

          return { x: px, y: py, theta: pt, weight: correlationWeight };
        })
      );

      return { x: nx, y: ny, theta: nt };
    });
  };

  // Perform Monte Carlo Particle Resampling
  const performParticleResampling = () => {
    setParticles((prev) => {
      if (prev.length === 0) return prev;
      
      // Find maximum weight
      const maxWeight = Math.max(...prev.map((p) => p.weight), 1e-4);
      const list = [];
      let index = Math.floor(Math.random() * prev.length);
      let beta = 0.0;

      for (let i = 0; i < prev.length; i++) {
        beta += Math.random() * 2.0 * maxWeight;
        while (beta > prev[index].weight) {
          beta -= prev[index].weight;
          index = (index + 1) % prev.length;
        }
        // Resample particle with slight dispersion noise
        list.push({
          x: prev[index].x + (Math.random() - 0.5) * 2,
          y: prev[index].y + (Math.random() - 0.5) * 2,
          theta: prev[index].theta + (Math.random() - 0.5) * 0.02,
          weight: 1.0
        });
      }
      return list;
    });
  };

  // Inject position disturbance (Scatters particles representation)
  const injectEncoderFailure = () => {
    setParticles((prev) =>
      prev.map((p) => ({
        ...p,
        x: p.x + (Math.random() - 0.5) * 60,
        y: p.y + (Math.random() - 0.5) * 60,
        theta: p.theta + (Math.random() - 0.5) * 0.8
      }))
    );
  };

  // Autonomous mapping loop
  useEffect(() => {
    if (!isAutoNav) return;
    const interval = setInterval(() => {
      // Sweeping rotational angles
      const rot = (Math.random() - 0.45) * 0.3;
      const speed = 6;
      const dx = Math.cos(robot.theta) * speed;
      const dy = Math.sin(robot.theta) * speed;
      steerRobot(dx, dy, rot);

      // Perform resampling periodically
      if (Math.random() > 0.6) {
        performParticleResampling();
      }
    }, 150);
    return () => clearInterval(interval);
  }, [isAutoNav, robot]);

  // Keep canvas drawings synchronised
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw occupancy mapped cells
    ctx.fillStyle = "rgba(147, 197, 253, 0.15)";
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 20; c++) {
        if (mappedGrid[r][c]) {
          ctx.fillRect(c * 17, r * 17, 16, 16);
        }
      }
    }

    // Grid design
    ctx.strokeStyle = "rgba(0,0,0,0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 17) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw static room walls
    ctx.strokeStyle = "#3f3f46";
    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    segments.forEach((seg) => {
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();
    });

    // Draw scanning laser raycasts
    ctx.strokeStyle = "rgba(59, 130, 246, 0.28)";
    ctx.lineWidth = 1;
    scanRays.forEach((ray) => {
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(ray.hitX, ray.hitY);
      ctx.stroke();
      
      // Hit points
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(ray.hitX, ray.hitY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Monte Carlo Particles
    ctx.fillStyle = "#ec4899";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw active Robic Robot
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.arc(robot.x, robot.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Direction line marker
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(robot.x, robot.y);
    ctx.lineTo(robot.x + Math.cos(robot.theta) * 11, robot.y + Math.sin(robot.theta) * 11);
    ctx.stroke();

  }, [robot, particles, scanRays, mappedGrid]);

  const mapProgress = Math.round(
    (mappedGrid.flat().filter(Boolean).length / 400) * 100
  );

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-4 mb-6 gap-4">
        <div>
          <h4 className="font-mono text-xs text-blue-600 uppercase tracking-widest font-semibold">interactive laboratory 05</h4>
          <h3 className="text-lg font-bold text-zinc-900 mt-1">2D LiDAR SLAM &amp; Monte Carlo Localization</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={injectEncoderFailure}
            className="px-3 py-1.5 border border-zinc-200 text-xs font-mono rounded-lg hover:bg-zinc-50 text-zinc-700"
          >
            Perturb Encoders (Add Noise)
          </button>
          <button
            onClick={() => {
              setRobot({ x: 170, y: 170, theta: -Math.PI / 4 });
              initParticles(170, 170, -Math.PI / 4);
              setMappedGrid(Array(20).fill(null).map(() => Array(20).fill(false)));
            }}
            className="px-3 py-1.5 border border-zinc-200 text-xs font-mono rounded-lg hover:bg-zinc-50 text-zinc-700"
          >
            Reset Mapping
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: SLAM Stage Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg p-2 relative">
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="bg-white border border-zinc-150 rounded shadow-xs max-w-full"
          />
          <div className="absolute top-4 left-4 bg-zinc-900/90 text-[9px] font-mono text-zinc-100 px-2 py-1 rounded shadow-md backdrop-blur-sm space-y-0.5">
            <div>POSE ESTIMATION: REAL-TIME OK</div>
            <div className="text-pink-400">PARTICLES: {particles.length} ACTIVE</div>
            <div className="text-blue-400 font-bold">SLAM MAP STATUS: OK</div>
          </div>
        </div>

        {/* Right Side: Operational HUD Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between py-1">
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-zinc-700 uppercase">[Localization Trace Log]</h4>
            <p className="text-[11px] font-mono leading-relaxed text-zinc-400">
              Steer the robot manually or trigger autonomous scan sweeps. Observe how pink Monte Carlo particles represent localized pose hypotheses. Triggering measuring scan sweeps filters higher-error particles and shrinks the dispersion cloud to resolve exact robot coordinates.
            </p>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-center">
                <span className="block text-[9px] font-mono text-zinc-400 uppercase">MAP PROGRESS</span>
                <span className="block text-2xl font-extrabold font-mono text-blue-600 mt-0.5">{mapProgress}%</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-center">
                <span className="block text-[9px] font-mono text-zinc-400 uppercase">POSE ERROR</span>
                <span className="block text-2xl font-extrabold font-mono text-zinc-800 mt-0.5">0.42mm</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-center font-mono">
                <span className="block text-[9px] text-zinc-400">STATIONARY</span>
                <span className="block text-xs font-bold text-emerald-600 mt-2">SYS_LOCK</span>
              </div>
            </div>

            {/* Manual steering interface buttons */}
            <div className="space-y-2 pt-2">
              <span className="block text-xs font-mono text-zinc-400">// MANUAL STEER INTERFACE</span>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => steerRobot(-Math.cos(robot.theta) * 10, -Math.sin(robot.theta) * 10, 0)}
                  className="px-4 py-2 border border-zinc-200 rounded hover:bg-zinc-50 font-mono text-xs"
                >
                  Backward
                </button>
                <button
                  onClick={() => steerRobot(0, 0, -0.2)}
                  className="px-4 py-2 border border-zinc-200 rounded hover:bg-zinc-50 font-mono text-xs"
                >
                  Turn Left
                </button>
                <button
                  onClick={() => steerRobot(0, 0, 0.2)}
                  className="px-4 py-2 border border-zinc-200 rounded hover:bg-zinc-50 font-mono text-xs"
                >
                  Turn Right
                </button>
                <button
                  onClick={() => steerRobot(Math.cos(robot.theta) * 10, Math.sin(robot.theta) * 10, 0)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-mono text-xs font-bold"
                >
                  Forward
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            <button
              onClick={() => setIsAutoNav(!isAutoNav)}
              className={`w-full py-2 px-4 shadow-sm tracking-wide text-xs font-mono font-bold rounded-lg transition duration-150 ${
                isAutoNav
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
            >
              {isAutoNav ? "STOP AUTO STEER" : "START AUTO STEER"}
            </button>
            <button
              onClick={performParticleResampling}
              className="w-full py-2 px-4 border border-zinc-200 text-zinc-800 bg-white hover:bg-zinc-50 tracking-wide text-xs font-mono font-bold rounded-lg transition duration-150"
            >
              FILTER RESAMPLE SCAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. Embedded Motor FOC Oscilloscope Telemetry Console
// ============================================================================
export function SheetCsvMenuSimulator() {
  const [setpointRPM, setSetpointRPM] = useState<number>(3000);
  const [loadTorque, setLoadTorque] = useState<number>(1.2);
  const [kp, setKp] = useState<number>(1.5);
  const [ki, setKi] = useState<number>(0.8);
  const [measuredRPM, setMeasuredRPM] = useState<number>(0);
  const [measuredTorque, setMeasuredTorque] = useState<number>(0);
  const [status, setStatus] = useState<"IDLE" | "FOC_RUN" | "LIMIT" | "THERMAL_WARN">("FOC_RUN");
  
  const [speedHistory, setSpeedHistory] = useState<number[]>(Array(50).fill(0));
  const [iaCurrentHistory, setIaCurrentHistory] = useState<number[]>(Array(50).fill(0));
  const [ibCurrentHistory, setIbCurrentHistory] = useState<number[]>(Array(50).fill(0));
  const [icCurrentHistory, setIcCurrentHistory] = useState<number[]>(Array(50).fill(0));

  // Physics integration loop updating at 100ms interval
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      setMeasuredRPM((prev) => {
        // First order motor delay modeling cascaded PI step response
        const diff = setpointRPM - prev;
        const correction = diff * (kp * 0.04) + (ki * 0.05);
        let next = prev + correction;
        if (Math.abs(diff) < 2) next = setpointRPM;
        
        // Rotor angle ticks proportional to speed
        angle += (next / 60) * 2 * Math.PI * 0.1;
        while (angle > Math.PI * 2) angle -= Math.PI * 2;

        // Space Vector stator phase sine currents derivation
        const statorAmplitude = 1.0 + (loadTorque * 0.8) + (Math.abs(diff) * 0.001);
        const ia = statorAmplitude * Math.cos(angle);
        const ib = statorAmplitude * Math.cos(angle - (2 * Math.PI) / 3);
        const ic = statorAmplitude * Math.cos(angle + (2 * Math.PI) / 3);

        setIaCurrentHistory((prevArr) => [...prevArr.slice(1), ia]);
        setIbCurrentHistory((prevArr) => [...prevArr.slice(1), ib]);
        setIcCurrentHistory((prevArr) => [...prevArr.slice(1), ic]);

        return next;
      });

      setMeasuredTorque(() => {
        // Torque ripple model
        const ripple = Math.sin(Date.now() / 150) * 0.04;
        return Number((loadTorque + ripple).toFixed(3));
      });

      // System thermal modeling
      const loadFactor = loadTorque * (setpointRPM / 4000);
      if (loadFactor > 1.2) {
        setStatus("THERMAL_WARN");
      } else if (loadFactor > 0.8) {
        setStatus("LIMIT");
      } else {
        setStatus("FOC_RUN");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [setpointRPM, loadTorque, kp, ki]);

  // Sync speed history for plotting
  useEffect(() => {
    setSpeedHistory((prev) => [...prev.slice(1), measuredRPM]);
  }, [measuredRPM]);

  // SVG dimensions for the scope
  const plotWidth = 340;
  const plotHeight = 130;

  const getPolyPoints = (historyArray: number[], minVal: number, maxVal: number) => {
    return historyArray
      .map((val, idx) => {
        const x = (idx / (historyArray.length - 1)) * plotWidth;
        const normY = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);
        const y = plotHeight - normY * plotHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm font-sans text-sm">
      <div className="flex border-b border-zinc-100 pb-4 mb-6">
        <div>
          <h4 className="font-mono text-xs text-blue-600 uppercase tracking-widest font-semibold">interactive laboratory 06</h4>
          <h3 className="text-lg font-bold text-zinc-900 mt-1">SVPWM Field Oriented Control FOC Telemetry</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Controllers & Tuning input meters */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="space-y-3 bg-zinc-50 border border-zinc-200 rounded-lg p-4">
            <h4 className="font-mono text-xs font-bold text-zinc-700 uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" /> STMicroelectronics FOC Tuning Parameters
            </h4>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span>Rotor Reference Speed (RPM):</span>
                <span className="font-bold text-blue-600">{setpointRPM} RPM</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={setpointRPM}
                onChange={(e) => setSetpointRPM(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span>Target Load Torque (Nm):</span>
                <span className="font-bold text-amber-600">{loadTorque} Nm</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={loadTorque}
                onChange={(e) => setLoadTorque(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-zinc-200">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-zinc-400">SPEED PI GAIN Kp:</span>
                <input
                  type="number"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={kp}
                  onChange={(e) => setKp(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs border border-zinc-200 rounded font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-zinc-400">SPEED PI GAIN Ki:</span>
                <input
                  type="number"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={ki}
                  onChange={(e) => setKi(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs border border-zinc-200 rounded font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg font-mono text-[10px] text-zinc-400 space-y-1">
            <span className="block font-bold text-zinc-700 uppercase">[STM32 Peripheral Status]</span>
            <div>ADC INTERRUPT CONVERSION: ACTIVE</div>
            <div>PWM TIMERS TRIGGER SYNC: 20kHz CENTER</div>
            <div className="flex items-center gap-1.5">
              <span>CONTROLLER SAFETY STATE:</span>
              <span className={`px-1 py-0.5 rounded text-[8.5px] font-bold ${
                status === "THERMAL_WARN"
                  ? "bg-red-100 text-red-700 animate-pulse"
                  : status === "LIMIT"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Dual Trace OSCILLOSCOPE Graph */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Oscilloscope 1: Speed Step Response */}
          <div className="border border-zinc-200 rounded-lg p-4 bg-zinc-950 font-mono relative">
            <span className="text-[9px] text-zinc-400 absolute top-2 left-3 uppercase">OSC TRACE 01: ROTOR SPEED STEP RESPONSE (RPM)</span>
            <span className="text-[10px] text-blue-400 absolute top-2 right-3 font-bold">MEASURED: {Math.round(measuredRPM)} RPM</span>
            
            <div className="h-32 mt-5 border border-zinc-800 rounded bg-black/90 p-1">
              <svg className="w-full h-full overflow-visible">
                {/* Reference Speed Line */}
                <line
                  x1={0}
                  y1={plotHeight - (setpointRPM / 5000) * plotHeight}
                  x2={plotWidth}
                  y2={plotHeight - (setpointRPM / 5000) * plotHeight}
                  stroke="rgba(59, 130, 246, 0.45)"
                  strokeDasharray="4,4"
                  strokeWidth={1.5}
                />
                {/* Live Output Speed Polyline */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  points={getPolyPoints(speedHistory, 0, 5000)}
                />
              </svg>
            </div>
          </div>

          {/* Oscilloscope 2: Space Vector Phase Currents */}
          <div className="border border-zinc-200 rounded-lg p-4 bg-zinc-950 font-mono relative">
            <span className="text-[9px] text-zinc-400 absolute top-2 left-3 uppercase">OSC TRACE 02: Clarke-Park Derived Three Phase Currents</span>
            <span className="text-[10px] text-emerald-400 absolute top-2 right-3 font-bold">Ia / Ib / Ic Sinusoidal Winding Outputs</span>

            <div className="h-32 mt-5 border border-zinc-800 rounded bg-black/90 p-1">
              <svg className="w-full h-full overflow-visible">
                {/* Horizontal reference axis */}
                <line x1={0} y1={plotHeight / 2} x2={plotWidth} y2={plotHeight / 2} stroke="#1b1b1f" strokeWidth={1} />
                
                {/* Phase A Current */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  points={getPolyPoints(iaCurrentHistory, -3.5, 3.5)}
                />
                {/* Phase B Current */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  points={getPolyPoints(ibCurrentHistory, -3.5, 3.5)}
                />
                {/* Phase C Current */}
                <polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth={1.5}
                  points={getPolyPoints(icCurrentHistory, -3.5, 3.5)}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
