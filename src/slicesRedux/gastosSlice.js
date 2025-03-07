import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
  participantes: JSON.parse(localStorage.getItem("participantes") || "[]"),
  gastos: JSON.parse(localStorage.getItem("gastos") || "[]"),
};

// Slice de gastos y participantes
const gastosSlice = createSlice({
  name: "gastos",
  initialState,
  reducers: {
    agregarParticipante: (state, action) => {
      const participante = action.payload;
      if (!state.participantes.includes(participante)) {
        state.participantes.push(participante);
        localStorage.setItem(
          "participantes",
          JSON.stringify(state.participantes)
        );
      }
    },
    eliminarParticipante: (state, action) => {
      const participante = action.payload;
      state.participantes = state.participantes.filter(
        (p) => p !== participante
      );
      localStorage.setItem(
        "participantes",
        JSON.stringify(state.participantes)
      );
    },
    agregarGasto: (state, action) => {
      const nuevoGasto = action.payload;
      state.gastos.push(nuevoGasto);
      localStorage.setItem("gastos", JSON.stringify(state.gastos));
    },
    eliminarGasto: (state, action) => {
      const index = action.payload;
      state.gastos = state.gastos.filter((_, i) => i !== index);
      localStorage.setItem("gastos", JSON.stringify(state.gastos));
    },
  },
});

export const {
  agregarParticipante,
  eliminarParticipante,
  agregarGasto,
  eliminarGasto,
} = gastosSlice.actions;

export default gastosSlice.reducer;
