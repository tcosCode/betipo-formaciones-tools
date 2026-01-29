import React, { useState } from "react";
import type { Formation } from "../types";
import { FormationCard } from "./FormationCard";
import { FormationModal } from "./FormationModal";

interface FormationGridProps {
  initialFormations: Formation[];
}

export default function FormationGrid({
  initialFormations,
}: FormationGridProps) {
  const [formations, setFormations] = useState<Formation[]>(
    Array.isArray(initialFormations) ? initialFormations : [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState<Formation | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    setCurrentFormation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (formation: Formation) => {
    setCurrentFormation(formation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/formaciones/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar");

      setFormations((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: Partial<Formation>) => {
    setIsLoading(true);
    setError(null);

    try {
      const isEditing = !!currentFormation;
      const url = isEditing
        ? `/api/formaciones/${currentFormation.id}`
        : "/api/formaciones";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al guardar");
      }

      const savedFormation = await response.json();

      if (isEditing) {
        setFormations((prev) =>
          prev.map((f) => (f.id === savedFormation.id ? savedFormation : f)),
        );
      } else {
        setFormations((prev) => [...prev, savedFormation]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Formaciones
            </h1>
            <p className="mt-1 text-slate-500">
              Listado completo de cursos y talleres disponibles
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Nueva formación</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
          {error}
        </div>
      )}

      {formations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm border border-slate-200">
          <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            No hay formaciones todavía
          </h3>
          <p className="mt-1 max-w-sm text-slate-500">
            Comienza creando tu primera formación para empezar a gestionarlas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <FormationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formation={currentFormation}
        isLoading={isLoading}
      />
    </div>
  );
}
