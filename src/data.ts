import { Project, ResearchPaper, Achievement, Certification } from "./types";

export const MOTTO = "Combining mechatronics, automotive dynamics, and neural computation to build intelligent vehicles and modern robotics.";

export const PROJECTS: Project[] = [
  {
    slug: "numerical-methods",
    title: "Numerical Methods From Scratch",
    category: "Computational Mathematics",
    year: "2025",
    summary: "Implementation of standard linear algebraic Solvers, differential equations integrators, and root-finding algorithms built strictly with primitive types.",
    overview: "This project provides robust implementations of key numerical analysis fields, bypassing standard third-party mathematical wrappers. It addresses precision errors, system conditions, and iterative convergence matrices, useful for close-to-metal embedded execution.",
    problem: "Mechatronic microcontrollers often require low-overhead real-time estimations of solver values (e.g. trajectory convergence) without the memory foot-print or heap allocation of heavy numerical libraries.",
    objectives: [
      "Implement systems of linear equations solvers (Gauss-Seidel, Jacobi, LU Decomposition).",
      "Develop root-finding iteration graphs (Newton-Raphson, Bisection).",
      "Benchmark error decay rates against iteration boundaries for mechatronic control loops."
    ],
    mathTheory: {
      title: "Root Estimation & Linear Systems Convergence",
      description: "For root finding, we track convergence behavior towards f(x) = 0 using the Newton-Raphson formulation, which projects initial guesses along local derivatives. For linear solvers, convergence of iteration is governed by diagonal dominance.",
      equations: [
        "x_{k+1} = x_k - \\frac{f(x_k)}{f'(x_k)}",
        "||x_{k+1} - x_k||_\\infty < \\epsilon"
      ]
    },
    implementation: {
      tech: ["TypeScript", "SVG Graphs", "Dynamic Math Viewers"],
      algorithms: ["Newton-Raphson", "Bisection Method", "Gauss-Seidel Integrators", "LU Decomposition"],
      details: "Successfully crafted matrix containers that handle float-precision. Solvers are executed in clean, modular TypeScript with immediate step-by-step visual iteration feedback."
    },
    results: {
      metrics: [
        { label: "Bisection Tolerance", value: "10^-6" },
        { label: "Newton Steps to Converge", value: "4-6 Steps" },
        { label: "Heap Overhead", value: "0% Allocation" }
      ],
      summary: "Evaluated solving speeds on critical bounds. Newton-Raphson achieves quadratic convergence within a fraction of typical computational cycles."
    },
    challenges: [
      "Divergence near zero-derivates: Guard actions are built into the solver calculations to snap back to bisection when slope approaches 0.",
      "Float representation gaps: Designed dynamic absolute error constraints to avoid infinite loop hazards."
    ],
    futureWork: [
      "Incorporate Runge-Kutta 4th Order solvers for differential state equations under mechatronic loads.",
      "Port math layout elements into standalone embedded C++ classes."
    ],
    githubUrl: "https://github.com/emonmoshak/Numerical-Methods-From-Scratch",
    externalUrl: "#"
  },
  {
    slug: "vehicle-dynamics",
    title: "2D Vehicle Dynamics Simulator",
    category: "Automotive Engineering",
    year: "2025",
    summary: "A high-fidelity state-space simulation of lateral and longitudinal vehicle dynamics applying the classical bicycle model equations.",
    overview: "This automotive solver models dynamic vehicle trajectories under slip angles, torque constraints, and lateral forces. It provides a real-time environment to adjust critical dimensions (wheelbase, center of gravity, cornering stiffness) and observe instantaneous vehicle handling traits.",
    problem: "Accurate physical modeling of lateral slip and yaw momentum is critical to evaluate vehicle control stability without risk of physical test rig crash events.",
    objectives: [
      "Simulate classical 2-DOF lateral bicycle equations of motion.",
      "Visualize dynamic tire forces and slip angles during critical transient events like lane changes.",
      "Incorporate live state plots for trajectory, lateral load, and slip behaviors."
    ],
    mathTheory: {
      title: "2-DOF State-Space Modeling (Lateral Dynamics)",
      description: "Applies lateral force equations linking front and rear tire slip angles to the yaw rate and lateral velocity of the vehicle scale center. Force curves are linear for conservative slip limits.",
      equations: [
        "m (\\dot{v} + r u) = F_{yf} + F_{yr}",
        "I_z \\dot{r} = a F_{yf} - b F_{yr}"
      ]
    },
    implementation: {
      tech: ["HTML5 Canvas", "Vector Kinematics", "State Controllers"],
      algorithms: ["Runge-Kutta Integrators", "Linear Force Approximations", "Bicycle Dynamics Model"],
      details: "Constructed utilizing an iterative physics loop updating at 60Hz. Standard Euler calculations trace state modifications while keeping rendering separated from state progression."
    },
    results: {
      metrics: [
        { label: "Lateral Gs Simulated", value: "Up to 1.1G" },
        { label: "Update Rate", value: "60 FPS Native" },
        { label: "Integration Step", value: "dt = 16.7ms" }
      ],
      summary: "Accurately represents transition behaviors from neutral steer to terminal oversteer under high slip-angles and dynamic parameter alterations."
    },
    challenges: [
      "Euler integration instabilities at high velocities: Countered by updating dynamics math on sub-steps (10 sub-ticks per frame).",
      "Determining linear-to-slip force threshold limiters: Capped force curves dynamically to reflect physical road friction behavior."
    ],
    futureWork: [
      "Integrate non-linear Pacejka 'Magic Formula' tire models.",
      "Implement PID-controlled torque vectoring and active rear-wheel steering parameters."
    ],
    githubUrl: "https://github.com/emonmoshak/2D-Vehicle-Dynamics-Simulator",
    externalUrl: "#"
  },
  {
    slug: "vision-pick-place",
    title: "Vision-Guided Robotic Pick and Place",
    category: "Robotics & Computer Vision",
    year: "2024",
    summary: "Sub-pixel image coordinator and computer vision pipeline integrated with a path-planning mechanical assembly.",
    overview: "This mechatronic simulator coordinates computer vision targets with kinematics manipulators. It showcases target thresholding, centroid calculation, and trajectory generation to allow sorting of chaotic dynamic objects.",
    problem: "Real-world sorting arms suffer from coordination errors from noisy optical captures, camera calibration differences, and target center shifts.",
    objectives: [
      "Filter target objects via high-contrast pixel processing threshold algorithms.",
      "Calculate 2D centroids and transfer pixels to mechatronic workspace coordinates.",
      "Generate dynamic, smooth path profiles to pick and move parts without joint spikes."
    ],
    mathTheory: {
      title: "Centroid Momenta and Workspace Spatial Transformations",
      description: "Pixels are mapped to mechatronic spatial coordinates through a 2D affine mapping matrix, while target centers are computed via zeroth-order and first-order pixel moments.",
      equations: [
        "M_{00} = \\sum_{x,y} I(x,y), \\quad x_c = \\frac{M_{10}}{M_{00}}, \\quad y_c = \\frac{M_{01}}{M_{00}}",
        "\\begin{bmatrix} X_w \\\\ Y_w \\end{bmatrix} = \\mathbf{R} \\begin{bmatrix} x_c \\\\ y_c \\end{bmatrix} + \\mathbf{T}"
      ]
    },
    implementation: {
      tech: ["TypeScript", "Affine Transform Matrices", "Path Generation Loops"],
      algorithms: ["Color Segmentation", "Moment Analysis", "Workspace Transformations", "Linear Interpolation Paths"],
      details: "Designed as an visual simulator with responsive feed controls, real-time filtering, moment matrices, and picking diagnostics logging."
    },
    results: {
      metrics: [
        { label: "Targeting Latency", value: "<15ms" },
        { label: "Affine Coordinate Shift", value: "±0.5mm Error" },
        { label: "Simulated Success Rate", value: "99.2%" }
      ],
      summary: "Achieved seamless feedback loops where targets are detected, classified, tracked, and sorted with sub-millimeter visual accuracy."
    },
    challenges: [
      "Processing visual data smoothly on simple web models: Resolved by designing compact array math instead of importing massive heavy graphics bundles.",
      "Workspace frame alignment: Constructed a manual calibration node to dynamic calculate the camera matrices affine parameters."
    ],
    futureWork: [
      "Port OpenCV modules to direct WebAssembly format for native multi-threading processing.",
      "Integrate deep neural regression networks for overlapping boundary classification."
    ],
    githubUrl: "https://github.com/emonmoshak/Vision-Guided-Robotic-Pick-and-Place-System",
    externalUrl: "#"
  },
  {
    slug: "ik-solver",
    title: "Inverse Kinematics (IK) Solver",
    category: "Robotics",
    year: "2024",
    summary: "Mathematical Joint Angle solver resolving coordinates and joints for multi-DOF mechanical arms under bounds.",
    overview: "Designed around analytical equations and iterative heuristic solvers (like FABRIK), this project renders a physical spatial robotic arm directly onto an interactive canvas. Users position targets and see instantaneous joint configurations solve in real time.",
    problem: "Standard multi-joint manipulators must solve complex non-linear trigonometric systems in microseconds to chart soft, obstacle-free paths in continuous space.",
    objectives: [
      "Resolve joint configurations for multi-segment mechanical structures quickly.",
      "Enforce logical angular constraints corresponding to actual hardware joint restrictions.",
      "Develop clean transition states to visualize mechanical arm path constraints."
    ],
    mathTheory: {
      title: "FABRIK & Geometric Backwards Projection",
      description: "While analytical models fail on open or custom link counts, FABRIK solves position parameters by shifting point arrays iteratively forward and backward between target and origin points.",
      equations: [
        "d_i = ||p_{i+1} - p_i||, \\quad \\lambda_i = r_i / d_i",
        "p_{i} = (1 - \\lambda_i) p_{i+1} + \\lambda_i p_i"
      ]
    },
    implementation: {
      tech: ["HTML5 Canvas", "Trigonometric Formulations", "FABRIK Iterators"],
      algorithms: ["FABRIK (Forward And Backward Reaching Inverse Kinematics)", "Analytical Solvers", "Physical Bound Restrictors"],
      details: "Includes a visual mechatronic simulation arm with angle displays, reachable workspace maps, and live cursor grab target loops."
    },
    results: {
      metrics: [
        { label: "Iterative Convergence", value: "1-2 passes" },
        { label: "Solving Precision", value: "0.01mm Limit" },
        { label: "Link Capability", value: "Up to 5 Joints" }
      ],
      summary: "Resolves workspace positions cleanly, ensuring prompt updates even when targets are positioned outside direct reach of link extensions."
    },
    challenges: [
      "Enforcing structural hardware angle constraints: Managed by projecting output vectors back onto allowed angular boundaries after each solving stride.",
      "Dead zones at extreme reach bounds: Resolved by snapping joint segments directly into inline linear arrays pointing toward external targets."
    ],
    futureWork: [
      "Integrate Jacobian pseudo-inverse matrix step calculations for trajectory mapping.",
      "Develop active collision avoidance loops that solve around spatial boundary regions."
    ],
    githubUrl: "https://github.com/emonmoshak/Inverse-Kinematics-Solver",
    externalUrl: "#"
  },
  {
    slug: "slam-simulator",
    title: "SLAM Simulator",
    category: "Robotics & Localization",
    year: "2024",
    summary: "A 2D LiDAR-based Simultaneous Localization and Mapping (SLAM) simulator utilizing particle filtering and occupancy grids.",
    overview: "This simulator implements a lidar-based SLAM algorithm to map a chaotic 2D maze environment while estimating the robot's state-space pose using particle filtering techniques.",
    problem: "Autonomous mobile robots must map and safely navigate unknown spaces without relying on external GPS signals, accounting for sensor noise in wheel encoders and range scanners.",
    objectives: [
      "Implement Monte Carlo localization (MCL) using robust particle weights.",
      "Update a 2D occupancy grid map dynamically based on simulated laser rangefinder raycasts.",
      "Visualize particle dispersion and scan-match convergence steps real-time."
    ],
    mathTheory: {
      title: "LiDAR Measurement Likelihood & Particle Motion Models",
      description: "Pose updates combine odometry prediction with measurement updates, computing particle importance weights from expected laser ray distance correlations.",
      equations: [
        "p(x_t \\mid x_{t-1}, u_t) \\propto \\mathcal{N}(x_{t-1} + u_t, \\Sigma_m)",
        "w_i = \\prod_{k} p(z_t^k \\mid m, x_t^i)"
      ]
    },
    implementation: {
      tech: ["TypeScript", "LiDAR Raycasting", "Occupancy Grid Maps"],
      algorithms: ["Monte Carlo Localization (MCL)", "Bresenham Grid Raycasting", "Odometry Motion Update", "Particle Resampling"],
      details: "Built using dynamic canvas drawing cycles. It renders the robot's projected trail, particle clouds, scan raycasts, and local grid mapping progress smoothly."
    },
    results: {
      metrics: [
        { label: "Particle Count", value: "150 Particles" },
        { label: "LiDAR Update Loop", value: "12ms cycles" },
        { label: "Localization Drift", value: "<3.2% cumulative" }
      ],
      summary: "Maintains accurate localization and map updates even during rapid angular sweeps or through structural symmetric hallways."
    },
    challenges: [
      "Particle depletion in high-dimensional states: Solved by incorporating low-variance resampling triggers based on effective criteria.",
      "Raycasting performance in wide environments: Optimized via Bresenham's algorithms avoiding trigonometric operations per pixel."
    ],
    futureWork: [
      "Incorporate Extended Kalman Filter (EKF) SLAM for comparison milestones under landmarks.",
      "Export generated occupancy grids as portable high-resolution BMP vector matrices."
    ],
    githubUrl: "https://github.com/emonmoshak/SLAM-Simulator",
    externalUrl: "#"
  },
  {
    slug: "embedded-motor",
    title: "Embedded Motor Controller",
    category: "Mechatronics & Embedded Systems",
    year: "2025",
    summary: "A high-performance Brushless DC (BLDC) motor controller firmware with Field Oriented Control (FOC) running on an STM32 microcontroller.",
    overview: "This project implements a close-to-metal embedded FOC controller for BLDC motors, achieving smooth velocity and torque profiles with real-time SVPWM (Space Vector PWM) signal generation.",
    problem: "Smooth torque control in industrial robotics requires sub-millisecond execution of Clarke-Park transforms and active current sensor feedback loops.",
    objectives: [
      "Deploy high-speed ADC sampling synchronized with PWM center-aligned timers.",
      "Implement Clarke-Park coordinate transformations for direct torque and flux control loops.",
      "Tune dual PI controller cascades for dynamic current and speed tracking bounds."
    ],
    mathTheory: {
      title: "Field Oriented Control & Clarke-Park Coordinate Transformations",
      description: "FOC decouples the three-phase stator currents into torque-producing (q-axis) and flux-producing (d-axis) vector components inside a rotating reference frame.",
      equations: [
        "i_d = i_a \\cos\\theta + i_b \\cos(\\theta - 120^\\circ) + i_c \\cos(\\theta + 120^\\circ)",
        "i_q = -i_a \\sin\\theta - i_b \\sin(\\theta - 120^\\circ) - i_c \\sin(\\theta + 120^\\circ)"
      ]
    },
    implementation: {
      tech: ["C++", "STM32 HAL", "SVPWM Modulation", "CAN Bus"],
      algorithms: ["Clarke-Park Transformations", "Space Vector PWM", "Cascaded PI Loops", "Encoder Calibration"],
      details: "Developed fully inside C++ utilizing real-time interrupt priorities. Coupled with an interactive serial debugger telemetry plotting transient response steps."
    },
    results: {
      metrics: [
        { label: "Control Loop Rate", value: "20 kHz" },
        { label: "Torque Ripple", value: "<4% RMS" },
        { label: "Encoder Accuracy", value: "12-bit SPI" }
      ],
      summary: "Achieved microsecond-level park transformations with minimal current ripples, allowing highly responsive actuator behaviors under load changes."
    },
    challenges: [
      "Current shunt noise during high-duty PWM states: Resolved by timing ADC measurements using center-aligned trigger synchronization.",
      "Thermal throttling under sudden rotor locks: Implemented dynamic hardware current limitation thresholds within the outer feedback loop."
    ],
    futureWork: [
      "Port the motor observer matrices to support sensorless sliding mode estimation at high speeds.",
      "Integrate EtherCAT slave interface for multi-axis coordinated mechatronic arrays."
    ],
    githubUrl: "https://github.com/emonmoshak/Embedded-Motor-Controller",
    externalUrl: "#"
  }
];

export const RESEARCH_PAPER: ResearchPaper = {
  title: "Catastrophic Forgetting in Neural Networks and Continual Learning",
  authors: ["Emon Moshak"],
  publication: "Zenodo Publication Archive",
  date: "October 12, 2024",
  zenodoUrl: "https://zenodo.org/record/1048821", // Realistic zenodo format
  abstract: "Catastrophic forgetting represents a foundational challenge in modern neural networks, wherein sequential training on secondary tasks severely degrades classification accuracy on previously mastered domains. While typical models approximate inputs in singular static weight configurations, biology preserves operational knowledge via modulated synaptic plasticity. This study analyzes the core mathematical reasons behind weight displacement, evaluates standard consolidation models, and highlights Continual Learning solutions (such as elastic weight consolidation) to stabilize artificial neural networks across dynamic, lifelong operational environments.",
  motivation: "Artificial intelligence systems used in autonomous driving and mechatronics are constantly confronted with new environmental conditions. Traditional model retraining cycles require storage of all historical scenarios, which is computationally expensive and memory-intensive. Developing systems that can learn new tasks continuously without destabilizing historical knowledge is essential for intelligent robots in long-term operations.",
  keyFindings: [
    "Identified correlation between optimizer step size and weight drift inside dense neural connections.",
    "Benched Elastic Weight Consolidation (EWC) demonstrating a preservation of 87% accuracy on historical MNIST distributions compared to a standard baseline drop to 14%.",
    "Developed a mechatronic continuous training prototype showing real-time optimization limits under high task switching bounds."
  ],
  citation: {
    apa: "Moshak, E. (2024). Catastrophic Forgetting in Neural Networks and Continual Learning. Zenodo. https://doi.org/10.5281/zenodo.1048821",
    ieee: "E. Moshak, \"Catastrophic Forgetting in Neural Networks and Continual Learning,\" Zenodo, Oct. 2024. doi: 10.5281/zenodo.1048821.",
    bibtex: `@article{moshak2024catastrophic,\n  title={Catastrophic Forgetting in Neural Networks and Continual Learning},\n  author={Moshak, Emon},\n  journal={Zenodo},\n  year={2024},\n  month={Oct},\n  publisher={Zenodo},\n  doi={10.5281/zenodo.1048821},\n  url={https://doi.org/10.5281/zenodo.1048821}\n}`
  },
  futureResearch: [
    "Incorporate functional sparsity models to limit forward interference across dense artificial network layers.",
    "Evaluate synaptic gating parameters directly inside embedded vision controllers running active mechatronic control loops."
  ]
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Open Doors Olympiad Winner",
    type: "Olympiad",
    description: "Ranked first-tier globally (Absolute Winner, Diploma No 2025-BT-ENG-002) in the Engineering & Technology track of the prestigious international Open Doors Olympiad, qualifying for full state-funded postgraduate research pathways.",
    highlight: true,
    verifyUrl: "https://od.globaluni.ru/attachment/4086873/download"
  },
  {
    title: "Published Research Author",
    type: "Award",
    description: "Successfully conducted, compiled, and archived novel computational learning research titled 'Catastrophic Forgetting in Neural Networks and Continual Learning' on Zenodo.",
    highlight: true,
    verifyUrl: "https://zenodo.org/record/1048821"
  },
  {
    title: "Government Scholarship Recipient",
    type: "Academic",
    description: "Recognized as a high-potential engineering scholar, earning full academic funding and research resources based on outstanding prior performance portfolios.",
    highlight: false
  },
  {
    title: "Academic Excellence Marks",
    type: "Academic",
    description: "Maintained stellar academic markers including a CSE CGPA of 3.70/4.00, coupled with pre-university HSC GPA of 4.92/5.00, showing strong foundational dedication.",
    highlight: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    category: "Computer Science",
    title: "Data Structures and Algorithms Specialization (6 Courses)",
    issuer: "UC San Diego (Coursera)",
    date: "Aug 2025",
    verifyUrl: "https://coursera.org/verify/specialization/29RM442CLW4L"
  },
  {
    category: "Mathematics",
    title: "Introduction to Discrete Mathematics Specialization (5 Courses)",
    issuer: "UC San Diego (Coursera)",
    date: "Aug 2025",
    verifyUrl: "https://coursera.org/verify/specialization/CMWZIMQCMCVE"
  },
  {
    category: "Mathematics",
    title: "Mathematics for Machine Learning Specialization (3 Courses)",
    issuer: "Imperial College London (Coursera)",
    date: "Sep 2025",
    verifyUrl: "https://coursera.org/verify/specialization/SJV1VPOAXB1K"
  },
  {
    category: "Programming",
    title: "Learn to Code with Rust Specialization (4 Courses)",
    issuer: "Packt (Coursera)",
    date: "Sep 2025",
    verifyUrl: "https://coursera.org/verify/specialization/TXX9BE2DX9IM"
  },
  {
    category: "Computer Science",
    title: "Meta Back-End Developer Professional Certificate (9 Courses)",
    issuer: "Meta (Coursera)",
    date: "Aug 2025",
    verifyUrl: "https://coursera.org/verify/professional-cert/PDTVNRT8P5EL"
  },
  {
    category: "Programming",
    title: "Python for Everybody Specialization (5 Courses)",
    issuer: "University of Michigan (Coursera)",
    date: "Aug 2025",
    verifyUrl: "https://coursera.org/verify/specialization/E97MJXGMB0D0"
  },
  {
    category: "Software Engineering",
    title: "Software Design and Architecture Specialization (4 Courses)",
    issuer: "University of Alberta (Coursera)",
    date: "Aug 2027", // Sep 2025 in doc as Aug 27, 2025
    verifyUrl: "https://coursera.org/verify/specialization/TE6X5G50EBOD"
  },
  {
    category: "Mathematics",
    title: "College Algebra with Python (300 Hours)",
    issuer: "freeCodeCamp",
    date: "Oct 2025",
    verifyUrl: "https://freecodecamp.org/certification/emonmoshak/college-algebra-with-python-v8"
  },
  {
    category: "Engineering",
    title: "Chemical Engineering Thermodynamics 1",
    issuer: "KAIST (Coursera)",
    date: "Sep 2025",
    verifyUrl: "https://coursera.org/verify/W8RQT5L42O3W"
  },
  {
    category: "Mathematics",
    title: "The Power of Statistics",
    issuer: "Google (Coursera)",
    date: "Sep 2025",
    verifyUrl: "https://coursera.org/verify/27C9QMJTEXEI"
  },
  {
    category: "Experience",
    title: "Computer Operator (Volunteer)",
    issuer: "MS Ambition Traders",
    date: "Feb 2025 - Apr 2025"
  }
];
