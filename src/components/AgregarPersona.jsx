import { useState } from "react";
import Card from "./Card";
import CardContent from "./CardContent";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { agregarParticipante } from "../slicesRedux/gastosSlice";

const AgregarPersona = ({ participantes }) => {
  const [nuevoParticipante, setNuevoParticipante] = useState("");
  const dispatch = useDispatch();

  const agregarParticipanteHandler = () => {
    const nombre = nuevoParticipante.trim();

    if (!nombre) {
      alert("Complete con un nombre");
      return;
    }
    if (participantes.includes(nombre)) {
      alert("El participante ya está en la lista");
      return;
    }
    dispatch(agregarParticipante(nombre));
    setNuevoParticipante("");
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="font-semibold">Participantes</h2>
        <div className="flex gap-2 my-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoParticipante}
            onChange={(e) => setNuevoParticipante(e.target.value)}
            className="border p-1"
          />
          <Button onClick={agregarParticipanteHandler}>Agregar</Button>
        </div>
        <ul>
          {participantes.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export default AgregarPersona;
