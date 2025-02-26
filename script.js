document.getElementById('formatButton').addEventListener('click', function () {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');

    // Function to convert raw math expressions to normal text format
    const convertToNormalText = (mathExpr) => {
     
        // Matrices
        mathExpr = mathExpr.replace(/\\begin\{matrix\}(.*?)\\end\{matrix\}/gs, (match, content) => {
            return `[${content.replace(/&/g, ' ').replace(/\\\\/g, '; ')}]`;
        });

        // Integrals
        mathExpr = mathExpr.replace(/\\int\s*_\{([^}]*)\}\s*\^\{([^}]*)\}/g, '∫_{$1}^{$2}');
        mathExpr = mathExpr.replace(/\\int/g, '∫');

        // Summations and Products
        mathExpr = mathExpr.replace(/\\sum\s*_\{([^}]*)\}\s*\^\{([^}]*)\}/g, '∑_{$1}^{$2}');
        mathExpr = mathExpr.replace(/\\prod\s*_\{([^}]*)\}\s*\^\{([^}]*)\}/g, '∏_{$1}^{$2}');

        // Fractions
        mathExpr = mathExpr.replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)');

        // Square Roots and nth Roots
        mathExpr = mathExpr.replace(/\\sqrt\[(.*?)\]\{(.*?)\}/g, '√[$1]($2)');
        mathExpr = mathExpr.replace(/\\sqrt\{(.*?)\}/g, '√($1)');

        // Trigonometric Functions
        mathExpr = mathExpr.replace(/\\sin/g, 'sin');
        mathExpr = mathExpr.replace(/\\cos/g, 'cos');
        mathExpr = mathExpr.replace(/\\tan/g, 'tan');

        // Greek Letters (e.g., \theta → θ)
        mathExpr = mathExpr.replace(/\\theta/g, 'θ');
        mathExpr = mathExpr.replace(/\\alpha/g, 'α');
        mathExpr = mathExpr.replace(/\\beta/g, 'β');
        mathExpr = mathExpr.replace(/\\gamma/g, 'γ');

        // Exponents and Subscripts
        mathExpr = mathExpr.replace(/\^\{(\d+)\}/g, '^$1');
        mathExpr = mathExpr.replace(/_\{(\d+)\}/g, '_$1');

        // Operators
        mathExpr = mathExpr.replace(/\\pm/g, '±');
        mathExpr = mathExpr.replace(/\\times/g, '×');
        mathExpr = mathExpr.replace(/\\cdot/g, '·');
        mathExpr = mathExpr.replace(/\\rightarrow/g, '→');

        // Remove Curly Braces
        mathExpr = mathExpr.replace(/\{|\}/g, '');

        return mathExpr;
    };

    // Replace raw math expressions with normal text format
    const formattedText = inputText.replace(/\$(.*?)\$/g, (match, p1) => {
        return convertToNormalText(p1);
    });

    // Inject the formatted text back into the textarea
    document.getElementById('inputText').value = formattedText;

    // Display the formatted text in the output div
    outputText.innerHTML = "<h1>Replaced successfully<h1/>";
    setTimeout(() => {
        outputText.innerHTML="";
    }, 2000);
});

// Copy formatted math expressions to clipboard
document.getElementById('copyButton').addEventListener('click', function () {
    const formattedText = document.getElementById('inputText').value;
    navigator.clipboard.writeText(formattedText).then(() => {
        alert('Formatted math expressions copied to clipboard!');
    }).catch((err) => {
        console.error('Failed to copy text: ', err);
    });
});

// Reset input textarea
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').innerHTML = '';
});