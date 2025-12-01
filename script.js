    // ========================================
    // STATE & CONFIGURATION
    // ========================================
    let state = {
      equations: [],
      categories: [],
      currentCategory: 'All',
      currentPage: 1,
      itemsPerPage: 20,
      searchQuery: '',
      selectedEquation: null,
      selectedVariable: null,
      theme: localStorage.getItem('theme') || 'light',
      currentView: 'home'
    };

    // Mock API configuration
    const API_BASE = 'https://engineering-api-pzlu.onrender.com/';
    const USE_MOCK_DATA = false; // Set to false when real API is ready

    // ========================================
    // MOCK DATA GENERATOR
    // ========================================
    function generateMockData() {
      const categories = [
        'Electrical Engineering',
        'Control Systems',
        'Power Systems',
        'Thermodynamics',
        'Fluid Mechanics',
        'Structural Analysis',
        'Signal Processing',
        'Digital Systems',
        'RF & Microwave',
        'Electromagnetics'
      ];

      const equations = [];
      const equationTemplates = [
        {
          name: "Ohm's Law",
          category: "Electrical Engineering",
          subcategory: "Basic Circuits",
          description: "Fundamental relationship between voltage, current, and resistance in an electrical circuit.",
          latex: "V = I \\cdot R",
          variables: [
            { symbol: "V", name: "Voltage", unit: "V", description: "Electric potential difference across the resistor", defaultCell: "C1" },
            { symbol: "I", name: "Current", unit: "A", description: "Electric current flowing through the resistor", defaultCell: "C2" },
            { symbol: "R", name: "Resistance", unit: "Ω", description: "Electrical resistance of the component", defaultCell: "C3" }
          ],
          resultVar: "V",
          excelFormula: "=C2*C3",
          steps: [
            "Multiply current (I) by resistance (R)",
            "The result is voltage (V) in volts"
          ],
          example: {
            given: "I = 2 A, R = 100 Ω",
            result: "V = 200 V"
          }
        },
        {
          name: "Power Dissipation",
          category: "Electrical Engineering",
          subcategory: "Power",
          description: "Power dissipated in a resistive element.",
          latex: "P = I^2 \\cdot R = \\frac{V^2}{R}",
          variables: [
            { symbol: "P", name: "Power", unit: "W", description: "Power dissipated as heat", defaultCell: "C1" },
            { symbol: "I", name: "Current", unit: "A", description: "Electric current through the resistor", defaultCell: "C2" },
            { symbol: "V", name: "Voltage", unit: "V", description: "Voltage across the resistor", defaultCell: "C3" },
            { symbol: "R", name: "Resistance", unit: "Ω", description: "Electrical resistance", defaultCell: "C4" }
          ],
          resultVar: "P",
          excelFormula: "=C2^2*C4",
          steps: [
            "Square the current: I²",
            "Multiply by resistance: I² × R",
            "Result is power in watts"
          ],
          example: {
            given: "I = 2 A, R = 50 Ω",
            result: "P = 200 W"
          }
        },
        {
          name: "RC Time Constant",
          category: "Electrical Engineering",
          subcategory: "Circuits",
          description: "Time constant for RC circuits determining charging/discharging rate.",
          latex: "\\tau = R \\cdot C",
          variables: [
            { symbol: "τ", name: "Time Constant", unit: "s", description: "Time to charge to 63.2% of final value", defaultCell: "C1" },
            { symbol: "R", name: "Resistance", unit: "Ω", description: "Circuit resistance", defaultCell: "C2" },
            { symbol: "C", name: "Capacitance", unit: "F", description: "Circuit capacitance", defaultCell: "C3" }
          ],
          resultVar: "τ",
          excelFormula: "=C2*C3",
          steps: [
            "Multiply resistance (R) by capacitance (C)",
            "Result is time constant in seconds"
          ],
          example: {
            given: "R = 10 kΩ, C = 100 µF",
            result: "τ = 1 s"
          }
        },
        {
          name: "Bernoulli's Equation",
          category: "Fluid Mechanics",
          subcategory: "Flow",
          description: "Conservation of energy in flowing fluids - Head loss between points 1 and 2.",
          latex: "h_L = \\left(\\frac{P_1}{\\gamma} + \\frac{V_1^2}{2g} + Z_1\\right) - \\left(\\frac{P_2}{\\gamma} + \\frac{V_2^2}{2g} + Z_2\\right)",
          variables: [
            { symbol: "P_1", name: "Upstream pressure", unit: "Pa", description: "Static pressure at point 1", defaultCell: "C1" },
            { symbol: "P_2", name: "Downstream pressure", unit: "Pa", description: "Static pressure at point 2", defaultCell: "C2" },
            { symbol: "V_1", name: "Upstream velocity", unit: "m/s", description: "Flow velocity at point 1", defaultCell: "C3" },
            { symbol: "V_2", name: "Downstream velocity", unit: "m/s", description: "Flow velocity at point 2", defaultCell: "C4" },
            { symbol: "Z_1", name: "Upstream elevation", unit: "m", description: "Elevation at point 1", defaultCell: "C5" },
            { symbol: "Z_2", name: "Downstream elevation", unit: "m", description: "Elevation at point 2", defaultCell: "C6" },
            { symbol: "\\gamma", name: "Specific weight", unit: "N/m³", description: "Fluid specific weight", defaultCell: "C7" },
            { symbol: "g", name: "Gravity", unit: "m/s²", description: "Gravitational acceleration", defaultCell: "C8", isConstant: true, constantValue: 9.81, constantDerivation: "Standard gravity at Earth's surface. Derived from Newton's law of universal gravitation: g = GM/R² where G is gravitational constant (6.674×10⁻¹¹ m³/kg·s²), M is Earth's mass (5.972×10²⁴ kg), and R is Earth's radius (6.371×10⁶ m)." }
          ],
          resultVar: "h_L",
          excelFormula: "=(C1/C7+C3^2/(2*9.81)+C5)-(C2/C7+C4^2/(2*9.81)+C6)",
          steps: [
            "Compute the upstream energy head: h₁ = P₁/γ + V₁²/(2g) + Z₁",
            "Compute the downstream energy head: h₂ = P₂/γ + V₂²/(2g) + Z₂",
            "Subtract: h_L = h₁ - h₂ to get the head loss between the two sections"
          ],
          example: {
            given: "P₁ = 200 kPa, P₂ = 150 kPa, V₁ = 3 m/s, V₂ = 2 m/s, Z₁ = 10 m, Z₂ = 6 m, γ = 9810 N/m³, g = 9.81 m/s²",
            result: "h_L ≈ 3.8 m of fluid"
          }
        },
        {
          name: "Reynolds Number",
          category: "Fluid Mechanics",
          subcategory: "Dimensionless Numbers",
          description: "Ratio of inertial forces to viscous forces, predicting flow regime.",
          latex: "Re = \\frac{\\rho v D}{\\mu}",
          variables: [
            { symbol: "Re", name: "Reynolds Number", unit: "", description: "Dimensionless parameter indicating turbulence", defaultCell: "C1" },
            { symbol: "ρ", name: "Density", unit: "kg/m³", description: "Fluid density", defaultCell: "C2" },
            { symbol: "v", name: "Velocity", unit: "m/s", description: "Characteristic velocity", defaultCell: "C3" },
            { symbol: "D", name: "Diameter", unit: "m", description: "Characteristic length (pipe diameter)", defaultCell: "C4" },
            { symbol: "μ", name: "Viscosity", unit: "Pa·s", description: "Dynamic viscosity", defaultCell: "C5" }
          ],
          resultVar: "Re",
          excelFormula: "=(C2*C3*C4)/C5",
          steps: [
            "Multiply density (ρ) × velocity (v) × diameter (D)",
            "Divide by dynamic viscosity (μ)",
            "Result is dimensionless Reynolds number"
          ],
          example: {
            given: "ρ = 1000 kg/m³, v = 2 m/s, D = 0.1 m, μ = 0.001 Pa·s",
            result: "Re = 200,000 (turbulent flow)"
          }
        },
        {
          name: "Three-Phase Power",
          category: "Power Systems",
          subcategory: "AC Power",
          description: "Real power in balanced three-phase systems.",
          latex: "P = \\sqrt{3} \\cdot V_L \\cdot I_L \\cdot \\cos(\\phi)",
          variables: [
            { symbol: "P", name: "Real Power", unit: "W", description: "Total three-phase real power", defaultCell: "C1" },
            { symbol: "\\sqrt{3}", name: "Three-phase factor", unit: "", description: "Geometric relationship between line and phase quantities", defaultCell: "C2", isConstant: true, constantValue: 1.732, constantDerivation: "Square root of 3 (≈1.732) appears in three-phase calculations due to the geometric relationship between line and phase quantities. In a balanced three-phase system, line voltage = √3 × phase voltage. This factor comes from vector addition of three 120° displaced phasors." },
            { symbol: "V_L", name: "Line Voltage", unit: "V", description: "RMS line-to-line voltage", defaultCell: "C3" },
            { symbol: "I_L", name: "Line Current", unit: "A", description: "RMS line current", defaultCell: "C4" },
            { symbol: "\\phi", name: "Phase Angle", unit: "rad", description: "Angle between voltage and current", defaultCell: "C5" }
          ],
          resultVar: "P",
          excelFormula: "=1.732*C3*C4*COS(C5)",
          steps: [
            "Multiply √3 × VL × IL × cos(φ)",
            "Result is total three-phase real power in watts"
          ],
          example: {
            given: "VL = 400 V, IL = 10 A, φ = 0.2 rad",
            result: "P ≈ 6788 W"
          }
        },
        {
          name: "Carnot Efficiency",
          category: "Thermodynamics",
          subcategory: "Heat Engines",
          description: "Maximum theoretical efficiency of a heat engine.",
          latex: "\\eta = 1 - \\frac{T_C}{T_H}",
          variables: [
            { symbol: "η", name: "Efficiency", unit: "", description: "Thermal efficiency (0 to 1)", defaultCell: "C1" },
            { symbol: "T_C", name: "Cold Temperature", unit: "K", description: "Absolute temperature of cold reservoir", defaultCell: "C2" },
            { symbol: "T_H", name: "Hot Temperature", unit: "K", description: "Absolute temperature of hot reservoir", defaultCell: "C3" }
          ],
          resultVar: "η",
          excelFormula: "=1-C2/C3",
          steps: [
            "Divide cold temperature by hot temperature: TC/TH",
            "Subtract from 1: η = 1 - TC/TH",
            "Result is efficiency (0 to 1, or multiply by 100 for %)"
          ],
          example: {
            given: "TC = 300 K, TH = 600 K",
            result: "η = 0.5 (50% efficiency)"
          }
        },
        {
          name: "Ideal Gas Law",
          category: "Thermodynamics",
          subcategory: "Gas Properties",
          description: "Equation of state for an ideal gas.",
          latex: "PV = nRT",
          variables: [
            { symbol: "P", name: "Pressure", unit: "Pa", description: "Absolute pressure of the gas", defaultCell: "C1" },
            { symbol: "V", name: "Volume", unit: "m³", description: "Volume occupied by gas", defaultCell: "C2" },
            { symbol: "n", name: "Amount", unit: "mol", description: "Number of moles of gas", defaultCell: "C3" },
            { symbol: "R", name: "Gas Constant", unit: "J/(mol·K)", description: "Universal gas constant", defaultCell: "C4", isConstant: true, constantValue: 8.314, constantDerivation: "Universal gas constant derived from Boltzmann constant (k = 1.381×10⁻²³ J/K) and Avogadro's number (NA = 6.022×10²³ mol⁻¹): R = k × NA = 8.314 J/(mol·K). Fundamental constant relating energy, temperature, and amount of substance." },
            { symbol: "T", name: "Temperature", unit: "K", description: "Absolute temperature", defaultCell: "C5" }
          ],
          resultVar: "P",
          excelFormula: "=(C3*8.314*C5)/C2",
          steps: [
            "Multiply n × R × T",
            "Divide by V",
            "Result is pressure P in pascals"
          ],
          example: {
            given: "n = 1 mol, R = 8.314 J/(mol·K), T = 273 K, V = 0.0224 m³",
            result: "P ≈ 101,325 Pa (1 atm)"
          }
        },
        {
          name: "Beam Deflection",
          category: "Structural Analysis",
          subcategory: "Beams",
          description: "Maximum deflection of a simply supported beam with center load.",
          latex: "\\delta = \\frac{FL^3}{48EI}",
          variables: [
            { symbol: "δ", name: "Deflection", unit: "m", description: "Maximum vertical displacement", defaultCell: "C1" },
            { symbol: "F", name: "Force", unit: "N", description: "Applied load at center", defaultCell: "C2" },
            { symbol: "L", name: "Length", unit: "m", description: "Beam span length", defaultCell: "C3" },
            { symbol: "48", name: "Beam constant", unit: "", description: "Integration constant from Euler-Bernoulli theory", defaultCell: "C4", isConstant: true, constantValue: 48, constantDerivation: "The constant 48 comes from integrating the bending moment equation twice for a simply supported beam with central point load. From Euler-Bernoulli beam theory: M(x) = F×x/2 for 0<x<L/2. Double integration with boundary conditions yields δmax = FL³/48EI at center (x=L/2)." },
            { symbol: "E", name: "Young's Modulus", unit: "Pa", description: "Material elastic modulus", defaultCell: "C5" },
            { symbol: "I", name: "Moment of Inertia", unit: "m⁴", description: "Second moment of area", defaultCell: "C6" }
          ],
          resultVar: "δ",
          excelFormula: "=(C2*C3^3)/(48*C5*C6)",
          steps: [
            "Cube the beam length: L³",
            "Multiply by force: F × L³",
            "Divide by 48 × E × I",
            "Result is maximum deflection at center"
          ],
          example: {
            given: "F = 1000 N, L = 3 m, E = 200 GPa, I = 8.33e-6 m⁴",
            result: "δ ≈ 0.0034 m (3.4 mm)"
          }
        },
        {
          name: "Nyquist Frequency",
          category: "Signal Processing",
          subcategory: "Sampling",
          description: "Minimum sampling rate to avoid aliasing.",
          latex: "f_s \\geq 2f_{max}",
          variables: [
            { symbol: "f_s", name: "Sampling Frequency", unit: "Hz", description: "Rate at which signal is sampled", defaultCell: "C1" },
            { symbol: "2", name: "Nyquist factor", unit: "", description: "Sampling theorem multiplier", defaultCell: "C2", isConstant: true, constantValue: 2, constantDerivation: "Nyquist-Shannon sampling theorem states that a signal must be sampled at twice its highest frequency component to perfectly reconstruct it. This factor of 2 comes from the requirement to capture both positive and negative slopes of the waveform. Proven by Harry Nyquist (1928) and Claude Shannon (1949)." },
            { symbol: "f_{max}", name: "Maximum Frequency", unit: "Hz", description: "Highest frequency in signal", defaultCell: "C3" }
          ],
          resultVar: "f_s",
          excelFormula: "=2*C3",
          steps: [
            "Double the maximum frequency: 2 × fmax",
            "Result is minimum sampling frequency to avoid aliasing"
          ],
          example: {
            given: "fmax = 1000 Hz",
            result: "fs = 2000 Hz (minimum)"
          }
        }
      ];

      // Generate variations
      for (let i = 0; i < 100; i++) {
        const template = equationTemplates[i % equationTemplates.length];
        equations.push({
          id: `eq_${i + 1}`,
          name: template.name + (i >= equationTemplates.length ? ` (Variant ${Math.floor(i / equationTemplates.length) + 1})` : ''),
          category: template.category,
          subcategory: template.subcategory,
          description: template.description,
          latex: template.latex,
          resultVar: template.resultVar,
          excelFormula: template.excelFormula,
          steps: template.steps,
          example: template.example,
          constants: template.constants,
          variables: template.variables.map(v => ({
            ...v,
            id: `${template.name.replace(/[^a-zA-Z]/g, '')}_${v.symbol.replace(/[^a-zA-Z]/g, '')}_${i}`
          }))
        });
      }

      return { equations, categories };
    }

    // ========================================
    // API FUNCTIONS
    // ========================================
    async function fetchEquations() {
      if (USE_MOCK_DATA) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return generateMockData();
      }

      try {
        const response = await fetch(`${API_BASE}/equations`);
        if (!response.ok) throw new Error('Failed to fetch equations');
        return await response.json();
      } catch (error) {
        console.error('Error fetching equations:', error);
        return generateMockData(); // Fallback to mock data
      }
    }

    async function fetchEquationById(id) {
      if (USE_MOCK_DATA) {
        return state.equations.find(eq => eq.id === id);
      }

      try {
        const response = await fetch(`${API_BASE}/equations/${id}`);
        if (!response.ok) throw new Error('Failed to fetch equation');
        return await response.json();
      } catch (error) {
        console.error('Error fetching equation:', error);
        return null;
      }
    }

    async function fetchVariableUsage(symbol) {
      if (USE_MOCK_DATA) {
        // Find all equations containing this variable
        return state.equations.filter(eq =>
          eq.variables.some(v => v.symbol === symbol)
        );
      }

      try {
        const response = await fetch(`${API_BASE}/variables/${encodeURIComponent(symbol)}`);
        if (!response.ok) throw new Error('Failed to fetch variable usage');
        return await response.json();
      } catch (error) {
        console.error('Error fetching variable:', error);
        return [];
      }
    }

    // ========================================
    // RENDERING FUNCTIONS
    // ========================================
    function renderCategoryPills() {
      const container = document.getElementById('categoryPills');
      const allCategories = ['All', ...new Set(state.equations.map(eq => eq.category))];
      state.categories = allCategories;

      container.innerHTML = allCategories.map(cat => `
        <button 
          class="category-pill ${cat === state.currentCategory ? 'active' : ''}"
          data-category="${cat}"
        >
          ${cat}
        </button>
      `).join('');

      container.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentCategory = btn.dataset.category;
          state.currentPage = 1;
          renderEquationList();
          renderCategoryPills();
        });
      });
    }

    function filterEquations() {
      return state.equations.filter(eq => {
        const matchesCategory = state.currentCategory === 'All' || eq.category === state.currentCategory;
        const matchesSearch = !state.searchQuery || 
          eq.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          eq.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          eq.variables.some(v => v.symbol.toLowerCase().includes(state.searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      });
    }

    function renderEquationList() {
      const filtered = filterEquations();
      const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
      const startIdx = (state.currentPage - 1) * state.itemsPerPage;
      const endIdx = startIdx + state.itemsPerPage;
      const pageEquations = filtered.slice(startIdx, endIdx);

      const listContainer = document.getElementById('equationList');
      listContainer.innerHTML = pageEquations.map(eq => `
        <li 
          class="equation-item ${state.selectedEquation?.id === eq.id ? 'active' : ''}"
          data-eq-id="${eq.id}"
        >
          <div class="equation-item-title">${eq.name}</div>
          <div class="equation-item-cat">${eq.category}</div>
        </li>
      `).join('');

      if (pageEquations.length === 0) {
        listContainer.innerHTML = '<div class="empty-state"><p>No equations found</p></div>';
      }

      listContainer.querySelectorAll('.equation-item').forEach(item => {
        item.addEventListener('click', () => {
          const eqId = item.dataset.eqId;
          const equation = state.equations.find(e => e.id === eqId);
          selectEquation(equation);
        });
      });

      // Update count and pagination
      document.getElementById('equationCount').textContent = filtered.length;
      document.getElementById('pageInfo').textContent = `Page ${state.currentPage} of ${totalPages || 1}`;
      document.getElementById('prevPage').disabled = state.currentPage === 1;
      document.getElementById('nextPage').disabled = state.currentPage >= totalPages;
    }

    function selectEquation(equation) {
      state.selectedEquation = equation;
      renderEquationDetail(equation);
      renderEquationList(); // Update active state
    }

    function renderEquationDetail(equation) {
      const mainContent = document.getElementById('mainContent');
      
      const colors = ['green', 'purple', 'orange', 'blue', 'pink', 'cyan'];
      
      // Separate constants from regular variables
      const regularVars = equation.variables.filter(v => !v.isConstant);
      const constantVars = equation.variables.filter(v => v.isConstant);
      
      mainContent.innerHTML = `
        <div class="card">
          <div class="equation-header">
            <div>
              <h1 class="equation-title">${equation.name}</h1>
              <div class="equation-category">${equation.category}</div>
            </div>
          </div>
          
          <p class="equation-description">${equation.description}</p>
          
          <div class="formula-display">$${equation.latex}$</div>
          
          <h2 class="variables-section-title">Variables</h2>
          <div class="variables-grid" id="variablesGrid">
            ${regularVars.map((v, idx) => {
              const color = colors[idx % colors.length];
              const cellRef = v.defaultCell || `C${idx + 1}`;
              return `
                <div class="variable-card color-${color}" data-variable-symbol="${v.symbol}" data-variable-id="${v.id}">
                  <div class="variable-header">
                    <div class="variable-dot color-${color}"></div>
                    <div class="variable-symbol-name">
                      <span class="variable-symbol-latex">$${v.symbol}$</span>
                      <span>${v.name}</span>
                    </div>
                  </div>
                  <div class="variable-units">Units: ${v.unit}</div>
                  <div class="variable-input-wrapper">
                    <input 
                      type="number" 
                      class="variable-input" 
                      placeholder="e.g. 10"
                      data-var-id="${v.id}"
                    />
                    <span class="variable-unit-label">${v.unit}</span>
                  </div>
                  <div class="excel-cell-row">
                    <span class="excel-cell-label">Excel cell:</span>
                    <input 
                      type="text" 
                      class="excel-cell-input" 
                      value="${cellRef}"
                      data-cell-id="${v.id}"
                    />
                  </div>
                </div>
              `;
            }).join('')}
            ${constantVars.map((v, idx) => {
              const color = colors[(regularVars.length + idx) % colors.length];
              return `
                <div class="variable-card color-${color}" data-variable-symbol="${v.symbol}" data-variable-id="${v.id}">
                  <div class="variable-header">
                    <div class="variable-dot color-${color}"></div>
                    <div class="variable-symbol-name">
                      <span class="variable-symbol-latex">$${v.symbol}$</span>
                      <span>${v.name}</span>
                    </div>
                  </div>
                  <div class="variable-units">Units: ${v.unit}</div>
                  <div class="variable-input-wrapper" style="margin-top: 8px;">
                    <span class="constant-value">
                      ${v.constantValue}
                      <span class="constant-tooltip">
                        <div class="constant-name">${v.name} = ${v.constantValue}</div>
                        ${v.constantDerivation}
                      </span>
                    </span>
                  </div>
                  <div class="excel-cell-row" style="visibility: hidden;">
                    <span class="excel-cell-label">Constant</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="result-section">
            <div class="result-label" id="resultLabel">Result:</div>
            <div class="result-value" id="resultValue">___</div>
            <div class="result-formula" id="resultFormula"></div>
            <button class="copy-excel-btn" id="copyExcelBtn">Copy Excel Formula</button>
            <div class="tip-text">Tip: Make sure the Excel cells you enter for each variable contain the numeric values you want to use.</div>
          </div>

          ${equation.steps ? `
            <div class="steps-section">
              <h3 class="steps-title">Step-by-step solution</h3>
              ${equation.steps.map((step, i) => `
                <div class="step-item">${i + 1}. ${step}</div>
              `).join('')}
            </div>
          ` : ''}

          ${equation.example ? `
            <div class="example-section">
              <div class="example-title">Worked example</div>
              <div class="example-given"><strong>Given:</strong> ${equation.example.given}</div>
              <div class="example-result"><strong>Result:</strong> ${equation.example.result}</div>
            </div>
          ` : ''}
        </div>
      `;

      // Retypeset MathJax
      if (window.MathJax) {
        MathJax.typesetPromise([mainContent]).catch(err => console.error('MathJax error:', err));
      }

      // Add input event listeners for real-time calculation
      const varInputs = mainContent.querySelectorAll('.variable-input');
      const cellInputs = mainContent.querySelectorAll('.excel-cell-input');
      
      varInputs.forEach(input => {
        input.addEventListener('input', () => calculateResult(equation));
      });

      cellInputs.forEach(input => {
        input.addEventListener('input', () => updateExcelFormula(equation));
      });

      // Add variable click handlers for drawer
      mainContent.querySelectorAll('.variable-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('variable-input') || 
              e.target.classList.contains('excel-cell-input') ||
              e.target.classList.contains('constant-value')) {
            return; // Don't trigger drawer if clicking inputs or constants
          }
          const varSymbol = card.dataset.variableSymbol;
          const variable = equation.variables.find(v => v.symbol === varSymbol);
          showVariableDrawer(variable);
          
          mainContent.querySelectorAll('.variable-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        });
      });

      // Copy Excel button
      const copyBtn = document.getElementById('copyExcelBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const formula = document.getElementById('resultFormula').textContent;
          if (formula && formula !== 'Enter values to see formula') {
            navigator.clipboard.writeText(formula).then(() => {
              copyBtn.textContent = 'Copied!';
              setTimeout(() => {
                copyBtn.textContent = 'Copy Excel Formula';
              }, 2000);
            });
          }
        });
      }

      // Initial formula display
      updateExcelFormula(equation);
    }

    function calculateResult(equation) {
      const mainContent = document.getElementById('mainContent');
      const inputs = mainContent.querySelectorAll('.variable-input');
      const values = {};
      let emptyVarId = null;
      let emptyCount = 0;

      // Collect all values and find which variable is empty (excluding constants)
      const regularVars = equation.variables.filter(v => !v.isConstant);
      
      inputs.forEach(input => {
        const varId = input.dataset.varId;
        const val = parseFloat(input.value);
        if (isNaN(val) || input.value === '') {
          emptyCount++;
          emptyVarId = varId;
        } else {
          values[varId] = val;
        }
      });

      // Add constant values automatically
      equation.variables.filter(v => v.isConstant).forEach(v => {
        values[v.id] = v.constantValue;
      });

      const resultValueEl = document.getElementById('resultValue');
      const resultLabelEl = document.getElementById('resultLabel');
      
      // Need exactly one empty variable to solve
      if (emptyCount === 1 && emptyVarId) {
        const result = solveEquation(equation, values, emptyVarId);
        if (result !== null) {
          const emptyVar = equation.variables.find(v => v.id === emptyVarId);
          resultLabelEl.innerHTML = `$${emptyVar.symbol}$ =`;
          resultValueEl.textContent = result.toFixed(3) + ' ' + emptyVar.unit;
          resultValueEl.style.color = '#10b981'; // Green for calculated
          
          // Re-render MathJax for the label
          if (window.MathJax) {
            MathJax.typesetPromise([resultLabelEl]).catch(err => console.error('MathJax error:', err));
          }
        } else {
          resultLabelEl.textContent = 'Result:';
          resultValueEl.textContent = 'Cannot calculate';
        }
      } else if (emptyCount === 0) {
        // All filled - show verification
        resultLabelEl.textContent = 'Result:';
        resultValueEl.textContent = 'All values entered';
        resultValueEl.style.color = '#3b82f6';
      } else {
        resultLabelEl.textContent = 'Result:';
        resultValueEl.textContent = '___';
        resultValueEl.style.color = '#3b82f6';
      }
    }

    function solveEquation(equation, values, solveForVarId) {
      // Get variable symbols for easier reference
      const vars = {};
      equation.variables.forEach(v => {
        if (values[v.id] !== undefined) {
          vars[v.symbol] = values[v.id];
        }
      });
      
      const solveForVar = equation.variables.find(v => v.id === solveForVarId);
      if (!solveForVar) return null;

      // Equation-specific solving logic
      const eqName = equation.name;

      // Ohm's Law: V = I * R
      if (eqName === "Ohm's Law") {
        if (solveForVar.symbol === "V") {
          return vars.I * vars.R;
        } else if (solveForVar.symbol === "I") {
          return vars.V / vars.R;
        } else if (solveForVar.symbol === "R") {
          return vars.V / vars.I;
        }
      }

      // Power: P = I^2 * R
      if (eqName === "Power Dissipation") {
        if (solveForVar.symbol === "P") {
          return Math.pow(vars.I, 2) * vars.R;
        } else if (solveForVar.symbol === "I") {
          return Math.sqrt(vars.P / vars.R);
        } else if (solveForVar.symbol === "R") {
          return vars.P / Math.pow(vars.I, 2);
        }
      }

      // RC Time: τ = R * C
      if (eqName === "RC Time Constant") {
        if (solveForVar.symbol === "τ") {
          return vars.R * vars.C;
        } else if (solveForVar.symbol === "R") {
          return vars.τ / vars.C;
        } else if (solveForVar.symbol === "C") {
          return vars.τ / vars.R;
        }
      }

      // Bernoulli Head Loss
      if (eqName === "Bernoulli's Equation") {
        const gamma = vars["\\gamma"] || vars.γ;
        const g = vars.g || 9.81;
        const P1 = vars.P_1;
        const P2 = vars.P_2;
        const V1 = vars.V_1;
        const V2 = vars.V_2;
        const Z1 = vars.Z_1;
        const Z2 = vars.Z_2;

        if (solveForVar.symbol === "h_L" || solveForVar.symbol === "h_{L}") {
          const h1 = (P1 / gamma) + (Math.pow(V1, 2) / (2 * g)) + Z1;
          const h2 = (P2 / gamma) + (Math.pow(V2, 2) / (2 * g)) + Z2;
          return h1 - h2;
        }
      }

      // Reynolds Number: Re = (ρ * v * D) / μ
      if (eqName === "Reynolds Number") {
        const rho = vars.ρ;
        const v = vars.v;
        const D = vars.D;
        const mu = vars.μ;

        if (solveForVar.symbol === "Re") {
          return (rho * v * D) / mu;
        } else if (solveForVar.symbol === "ρ") {
          return (vars.Re * mu) / (v * D);
        } else if (solveForVar.symbol === "v") {
          return (vars.Re * mu) / (rho * D);
        } else if (solveForVar.symbol === "D") {
          return (vars.Re * mu) / (rho * v);
        } else if (solveForVar.symbol === "μ") {
          return (rho * v * D) / vars.Re;
        }
      }

      // Ideal Gas: PV = nRT
      if (eqName === "Ideal Gas Law") {
        const P = vars.P;
        const V = vars.V;
        const n = vars.n;
        const R = vars.R || 8.314;
        const T = vars.T;

        if (solveForVar.symbol === "P") {
          return (n * R * T) / V;
        } else if (solveForVar.symbol === "V") {
          return (n * R * T) / P;
        } else if (solveForVar.symbol === "n") {
          return (P * V) / (R * T);
        } else if (solveForVar.symbol === "T") {
          return (P * V) / (n * R);
        }
      }

      // Carnot Efficiency: η = 1 - (Tc / Th)
      if (eqName === "Carnot Efficiency") {
        const eta = vars.η;
        const Tc = vars.T_C;
        const Th = vars.T_H;

        if (solveForVar.symbol === "η") {
          return 1 - (Tc / Th);
        } else if (solveForVar.symbol === "T_C") {
          return Th * (1 - eta);
        } else if (solveForVar.symbol === "T_H") {
          return Tc / (1 - eta);
        }
      }

      // Three-Phase Power: P = √3 * VL * IL * cos(φ)
      if (eqName === "Three-Phase Power") {
        const P = vars.P;
        const VL = vars.V_L;
        const IL = vars.I_L;
        const phi = vars.φ;

        if (solveForVar.symbol === "P") {
          return Math.sqrt(3) * VL * IL * Math.cos(phi);
        } else if (solveForVar.symbol === "V_L") {
          return P / (Math.sqrt(3) * IL * Math.cos(phi));
        } else if (solveForVar.symbol === "I_L") {
          return P / (Math.sqrt(3) * VL * Math.cos(phi));
        }
      }

      // Beam Deflection: δ = (F * L^3) / (48 * E * I)
      if (eqName === "Beam Deflection") {
        const delta = vars.δ;
        const F = vars.F;
        const L = vars.L;
        const E = vars.E;
        const I = vars.I;

        if (solveForVar.symbol === "δ") {
          return (F * Math.pow(L, 3)) / (48 * E * I);
        } else if (solveForVar.symbol === "F") {
          return (delta * 48 * E * I) / Math.pow(L, 3);
        } else if (solveForVar.symbol === "L") {
          return Math.pow((delta * 48 * E * I) / F, 1/3);
        }
      }

      // Nyquist: fs >= 2 * fmax
      if (eqName === "Nyquist Frequency") {
        const fs = vars.f_s;
        const fmax = vars["f_{max}"];

        if (solveForVar.symbol === "f_s") {
          return 2 * fmax;
        } else if (solveForVar.symbol === "f_{max}") {
          return fs / 2;
        }
      }

      return null; // Cannot solve
    }

    function updateExcelFormula(equation) {
      const mainContent = document.getElementById('mainContent');
      const cellInputs = mainContent.querySelectorAll('.excel-cell-input');
      const cells = [];

      cellInputs.forEach(input => {
        cells.push(input.value || 'C1');
      });

      const formulaEl = document.getElementById('resultFormula');
      if (equation.excelFormula) {
        // Replace cell references in formula
        let formula = equation.excelFormula;
        equation.variables.forEach((v, i) => {
          const defaultCell = v.defaultCell || `C${i + 1}`;
          const actualCell = cells[i] || defaultCell;
          formula = formula.replace(new RegExp(defaultCell, 'g'), actualCell);
        });
        formulaEl.textContent = formula;
      } else {
        formulaEl.textContent = 'Enter values to see formula';
      }
    }

    async function showVariableDrawer(variable) {
      state.selectedVariable = variable;
      const drawer = document.getElementById('variableDrawer');
      const content = document.getElementById('drawerContent');
      
      drawer.classList.add('mobile-open');
      
      content.innerHTML = `
        <div class="variable-detail">
          <div class="detail-label">Symbol</div>
          <div class="detail-value" style="font-size: 1.5rem; color: var(--accent); font-weight: 700;">
            $${variable.symbol}$
          </div>
        </div>
        
        <div class="variable-detail">
          <div class="detail-label">Name</div>
          <div class="detail-value">${variable.name}</div>
        </div>
        
        <div class="variable-detail">
          <div class="detail-label">Units</div>
          <div class="detail-value">${variable.unit}</div>
        </div>
        
        <div class="variable-detail">
          <div class="detail-label">Description</div>
          <div class="detail-value">${variable.description}</div>
        </div>
        
        <div class="variable-detail">
          <div class="detail-label">Related Equations</div>
          <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      `;

      // Retypeset MathJax in drawer
      if (window.MathJax) {
        MathJax.typesetPromise([content]).catch(err => console.error('MathJax error:', err));
      }

      // Fetch related equations
      const relatedEqs = await fetchVariableUsage(variable.symbol);
      
      const relatedSection = content.querySelector('.variable-detail:last-child');
      relatedSection.innerHTML = `
        <div class="detail-label">Related Equations (${relatedEqs.length})</div>
        <ul class="related-equations-list">
          ${relatedEqs.map(eq => `
            <li class="related-equation-item" data-eq-id="${eq.id}">
              <div class="related-eq-name">${eq.name}</div>
              <div class="related-eq-cat">${eq.category}</div>
            </li>
          `).join('')}
        </ul>
      `;

      relatedSection.querySelectorAll('.related-equation-item').forEach(item => {
        item.addEventListener('click', () => {
          const eqId = item.dataset.eqId;
          const equation = state.equations.find(e => e.id === eqId);
          selectEquation(equation);
          drawer.classList.remove('mobile-open');
        });
      });
    }

    function renderAboutPage() {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = `
        <div class="card about-content">
          <h1>About Engineering Reference</h1>
          <p>
            Welcome to the Engineering Reference Library — a comprehensive database of over 100,000 
            engineering equations spanning multiple disciplines including electrical engineering, 
            control systems, thermodynamics, fluid mechanics, and more.
          </p>

          <h2>How to Use</h2>
          <p>
            <strong>Browse by Category:</strong> Use the category filters in the sidebar to narrow 
            down equations by discipline. Select a category, then click any equation to view its 
            details.
          </p>
          <p>
            <strong>Search:</strong> Use the global search bar to find equations by name, category, 
            or even by variable symbol. The search supports partial matching and is case-insensitive.
          </p>
          <p>
            <strong>Interactive Variables:</strong> Click on any variable in an equation to see its 
            full definition, units, and all other equations where it appears. This helps you 
            understand relationships between different formulas.
          </p>
          <p>
            <strong>Dark Mode:</strong> Toggle between light and dark themes using the theme button 
            in the header for comfortable viewing in any environment.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Over 100,000 engineering equations across 10+ disciplines</li>
            <li>Interactive variable explorer showing relationships between equations</li>
            <li>LaTeX rendering for beautiful mathematical notation via MathJax</li>
            <li>Responsive design that works on desktop, tablet, and mobile</li>
            <li>Fast search and filtering capabilities</li>
            <li>Pagination for efficient browsing of large equation sets</li>
            <li>Dark mode support</li>
          </ul>

          <h2>API Integration</h2>
          <p>
            This interface is designed to work with a backend REST API. Expected endpoints include:
          </p>
          <ul>
            <li><code>GET /equations</code> — Fetch all equations</li>
            <li><code>GET /equations/:id</code> — Fetch specific equation by ID</li>
            <li><code>GET /variables/:symbol</code> — Find all equations using a variable</li>
            <li><code>GET /categories</code> — List all available categories</li>
          </ul>

          <h2>Technologies</h2>
          <p>
            Built with vanilla JavaScript, modern CSS, and MathJax for equation rendering. 
            No framework dependencies — just clean, efficient code that runs anywhere.
          </p>

          <h2>Tips for Best Results</h2>
          <ul>
            <li>Use specific search terms for faster results</li>
            <li>Explore variable relationships to discover connected equations</li>
            <li>Bookmark frequently used equations for quick access</li>
            <li>Use keyboard navigation in search for efficiency</li>
          </ul>
        </div>
      `;
    }

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================
    let searchTimeout;
    const globalSearchInput = document.getElementById('globalSearchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');

    globalSearchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();

      if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        state.searchQuery = '';
        renderEquationList();
        return;
      }

      searchTimeout = setTimeout(() => {
        state.searchQuery = query;
        showSearchSuggestions(query);
        if (state.currentView === 'home') {
          renderEquationList();
        }
      }, 300);
    });

    function showSearchSuggestions(query) {
      const matches = state.equations
        .filter(eq => 
          eq.name.toLowerCase().includes(query.toLowerCase()) ||
          eq.category.toLowerCase().includes(query.toLowerCase()) ||
          eq.variables.some(v => v.symbol.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 10);

      if (matches.length === 0) {
        searchSuggestions.classList.remove('active');
        return;
      }

      searchSuggestions.innerHTML = matches.map(eq => `
        <div class="suggestion-item" data-eq-id="${eq.id}">
          <div class="suggestion-title">${eq.name}</div>
          <div class="suggestion-meta">${eq.category} › ${eq.subcategory}</div>
        </div>
      `).join('');

      searchSuggestions.classList.add('active');

      searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const eqId = item.dataset.eqId;
          const equation = state.equations.find(e => e.id === eqId);
          selectEquation(equation);
          searchSuggestions.classList.remove('active');
          globalSearchInput.value = '';
          state.searchQuery = '';
          
          // Switch to home view if needed
          if (state.currentView !== 'home') {
            showHomePage();
          }
        });
      });
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.global-search')) {
        searchSuggestions.classList.remove('active');
      }
    });

    // ========================================
    // THEME TOGGLE
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    
    function setTheme(theme) {
      state.theme = theme;
      document.body.dataset.theme = theme;
      localStorage.setItem('theme', theme);
      themeToggle.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
    }

    themeToggle.addEventListener('click', () => {
      setTheme(state.theme === 'light' ? 'dark' : 'light');
    });

    // Initialize theme
    setTheme(state.theme);

    // ========================================
    // NAVIGATION
    // ========================================
    function showHomePage() {
      state.currentView = 'home';
      renderEquationList();
      if (state.selectedEquation) {
        renderEquationDetail(state.selectedEquation);
      } else if (state.equations.length > 0) {
        selectEquation(state.equations[0]);
      }
    }

    function showAboutPage() {
      state.currentView = 'about';
      renderAboutPage();
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        
        document.querySelectorAll('.nav-link').forEach(l => l.style.fontWeight = '500');
        link.style.fontWeight = '700';
        
        if (page === 'home') {
          showHomePage();
        } else if (page === 'about') {
          showAboutPage();
        }
      });
    });

    // ========================================
    // PAGINATION
    // ========================================
    document.getElementById('prevPage').addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderEquationList();
      }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
      const filtered = filterEquations();
      const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage++;
        renderEquationList();
      }
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const drawerClose = document.getElementById('drawerClose');
    const variableDrawer = document.getElementById('variableDrawer');

    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    drawerClose.addEventListener('click', () => {
      variableDrawer.classList.remove('mobile-open');
    });

    // Close mobile menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-toggle')) {
        sidebar.classList.remove('mobile-open');
      }
    });

    // ========================================
    // INITIALIZATION
    // ========================================
    async function init() {
      try {
        const data = await fetchEquations();
        state.equations = data.equations;
        state.categories = data.categories;

        renderCategoryPills();
        renderEquationList();

        // Select first equation
        if (state.equations.length > 0) {
          selectEquation(state.equations[0]);
        }
      } catch (error) {
        console.error('Initialization error:', error);
        document.getElementById('mainContent').innerHTML = `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">⚠️</div>
              <h2>Failed to load equations</h2>
              <p>Please check your connection and try again.</p>
            </div>
          </div>
        `;
      }
    }

    // Start the application
    init();
