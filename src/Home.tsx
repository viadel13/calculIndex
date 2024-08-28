import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import jsPDF from "jspdf";

const Home = () => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    nouvelleIndex: "",
    ancienIndex: "",
    tarif: "",
  });

  const [stateC, setStateC] = useState({
    nouvelleIndex: "",
    ancienIndex: "",
    tarif: "",
  });
  const [factureDetails, setFactureDetails] = useState<string | null>(null);
  const [factureDetailsC, setFactureDetailsC] = useState<string | null>(null);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentIndex = parseFloat(state.nouvelleIndex);
    const previousIndex = parseFloat(state.ancienIndex);
    const rate = parseFloat(state.tarif);
    const vatRate = 19.25;

    if (isNaN(currentIndex) || isNaN(previousIndex) || isNaN(rate)) {
      alert(
        "Veuillez entrer des valeurs numériques valides dans tous les champs."
      );
      return;
    }

    if (currentIndex < 0 || previousIndex < 0 || rate < 0) {
      alert("Les valeurs doivent être des nombres positifs.");
      return;
    }

    const indexDifference = Math.abs(currentIndex - previousIndex);
    const subtotal = indexDifference * rate;
    const vatAmount = (subtotal * vatRate) / 100;
    const totalAmount = subtotal + vatAmount;

    const details = `
    <h3>Facture Détail</h3>
    <p><strong>Nouvel Index:</strong> ${currentIndex}</p>
    <p><strong>Ancien Index:</strong> ${previousIndex}</p>
    <p><strong>Tarif:</strong> ${rate.toFixed(0)} FCFA</p>
    <p><strong>Différence d'Index:</strong> ${indexDifference} (Nouvel Index - Ancien Index)</p>
    <p><strong>Montant HT:</strong> ${subtotal} FCFA (Différence d'Index * Tarif)</p>
    <p><strong>TVA:</strong> ${vatRate}%</p>
    <p><strong>Montant TVA:</strong> ${vatAmount.toFixed(
      2
    )} FCFA (Montant HT * TVA / 100)</p>
    <p><strong>Montant Total:</strong> ${totalAmount.toFixed(
      2
    )} FCFA (Montant HT + Montant TVA)</p>
        <p style="text-align: center; font-size: 25px; font-weight: bold; color: green ";>
      <strong>Total:</strong> ${totalAmount.toFixed(2)} FCFA
    </p>
  `;
    setFactureDetails(details);

    setState({
      nouvelleIndex: "",
      ancienIndex: "",
      tarif: "",
    });
  }

  function handleSubmitC(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentIndex = parseFloat(stateC.nouvelleIndex);
    const previousIndex = parseFloat(stateC.ancienIndex);
    const rate = parseFloat(stateC.tarif);
    const vatRate = 19.25;
    const maintainsCounter = 250;

    if (isNaN(currentIndex) || isNaN(previousIndex) || isNaN(rate)) {
      alert(
        "Veuillez entrer des valeurs numériques valides dans tous les champs."
      );
      return;
    }

    if (currentIndex < 0 || previousIndex < 0 || rate < 0) {
      alert("Les valeurs doivent être des nombres positifs.");
      return;
    }

    const indexDifference = Math.abs(currentIndex - previousIndex);
    const subtotal = indexDifference * rate;
    const vatAmount = (subtotal * vatRate) / 100;
    const totalAmount = subtotal + vatAmount + maintainsCounter;

    const details = `
    <h3>Facture Détail</h3>
    <p><strong>Nouvel Index:</strong> ${currentIndex}</p>
    <p><strong>Ancien Index:</strong> ${previousIndex}</p>
    <p><strong>Tarif:</strong> ${rate.toFixed(0)} FCFA</p>
    <p><strong>Différence d'Index:</strong> ${indexDifference} (Nouvel Index - Ancien Index)</p>
    <p><strong>Montant HT:</strong> ${subtotal.toFixed(
      2
    )} FCFA (Différence d'Index * Tarif)</p>
    <p><strong>TVA:</strong> ${vatRate}%</p>
    <p><strong>Montant TVA:</strong> ${vatAmount.toFixed(
      2
    )} FCFA (Montant HT * TVA / 100)</p>
    <p><strong>Entretien du compteur:</strong> ${maintainsCounter} FCFA</p>
    <p><strong>Montant Total:</strong> ${totalAmount.toFixed(
      2
    )} FCFA (Montant HT + Montant TVA + Entretien du compteur)</p>
    <p style="text-align: center; font-size: 25px; font-weight: bold; color: green;">
      <strong>Total:</strong> ${totalAmount.toFixed(2)} FCFA
    </p>
  `;

    setFactureDetailsC(details);

    // Réinitialiser les champs de formulaire
    setStateC({
      nouvelleIndex: "",
      ancienIndex: "",
      tarif: "",
    });
  }

  function exportPDF() {
    if (!factureDetails) return;

    const doc = new jsPDF();
    const elementHTML = document.querySelector(
      "#facture-content"
    ) as HTMLElement;

    if (elementHTML) {
      doc.setFontSize(10);
      doc.html(elementHTML, {
        callback: function (doc) {
          doc.save("facture.pdf");
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 800,
      });
    } else {
      console.error("Element HTML non trouvé");
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F1F7FA",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="example tabs">
          <Tab label="ENEO" />
          <Tab label="CAMWATER" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2, pb: 4, width: "100%" }}>
        <Typography
          sx={{
            textAlign: "center",
            m: 4,
            fontWeight: "bold",
            backgroundColor: value !== 0 ? "#9DDBF3" : "#80ed99",
          }}
        >
          {value === 0 ? "CALCUL FACTURE ENEO" : "CALCUL FACTURE CAMWATER"}
        </Typography>
        {value === 0 && (
          <Stack
            alignItems="center"
            spacing={2}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Stack>
              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Nouvel index"
                  variant="outlined"
                  value={state.nouvelleIndex}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      nouvelleIndex: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Ancien index"
                  variant="outlined"
                  value={state.ancienIndex}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      ancienIndex: e.target.value,
                    }))
                  }
                />
              </Box>

              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Tarif Rate"
                  variant="outlined"
                  value={state.tarif}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      tarif: e.target.value,
                    }))
                  }
                />
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" sx={{ width: 100 }} type="submit">
                Valider
              </Button>
              {factureDetails && (
                <Button
                  variant="outlined"
                  onClick={exportPDF}
                  className="no-print"
                >
                  Exporter en PDF
                </Button>
              )}
            </Stack>

            {factureDetails && (
              <Box
                sx={{ mt: 4, p: 2, border: "2px solid #ddd", borderRadius: 2 }}
                id="facture-content"
              >
                <Typography variant="h6" color="blue">
                  FACTURE {value === 0 ? "ENEO" : "CAMWATER"}{" "}
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: factureDetails }} />
              </Box>
            )}
          </Stack>
        )}
        {value === 1 && (
          <Stack
            alignItems="center"
            spacing={2}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitC}
          >
            <Stack>
              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Nouvel index"
                  variant="outlined"
                  value={stateC.nouvelleIndex}
                  onChange={(e) =>
                    setStateC((prevState) => ({
                      ...prevState,
                      nouvelleIndex: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Ancien index"
                  variant="outlined"
                  value={stateC.ancienIndex}
                  onChange={(e) =>
                    setStateC((prevState) => ({
                      ...prevState,
                      ancienIndex: e.target.value,
                    }))
                  }
                />
              </Box>

              <Box sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
                <TextField
                  id="outlined-basic"
                  label="Tarif Rate"
                  variant="outlined"
                  value={stateC.tarif}
                  onChange={(e) =>
                    setStateC((prevState) => ({
                      ...prevState,
                      tarif: e.target.value,
                    }))
                  }
                />
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" sx={{ width: 100 }} type="submit">
                Valider
              </Button>
              {factureDetailsC && (
                <Button
                  variant="outlined"
                  onClick={exportPDF}
                  className="no-print"
                >
                  Exporter en PDF
                </Button>
              )}
            </Stack>
            {value !== 1
              ? factureDetails && (
                  <Box
                    sx={{
                      mt: 4,
                      p: 2,
                      border: "2px solid #ddd",
                      borderRadius: 2,
                    }}
                    id="facture-content"
                  >
                    <Typography variant="h6" color="blue">
                      FACTURE {value === 1 ? "ENEO" : "CAMWATER"}{" "}
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: factureDetails }} />
                  </Box>
                )
              : factureDetailsC && (
                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    border: "2px solid #ddd",
                    borderRadius: 2,
                  }}
                  id="facture-content"
                >
                  <Typography variant="h6" color="blue">
                    FACTURE {value !== 1 ? "ENEO" : "CAMWATER"}
                  </Typography>
                  <Box dangerouslySetInnerHTML={{ __html: factureDetailsC }} />
                </Box>
              )}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Home;
