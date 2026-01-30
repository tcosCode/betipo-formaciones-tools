import { useState, useEffect } from "react";

interface EnvSelectorProps {
  onChange: (env: "dev" | "prod") => void;
  currentEnv: "dev" | "prod";
}

export function EnvSelector({ onChange, currentEnv }: EnvSelectorProps) {
  return (
    <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg">
      <span className="text-sm font-medium text-slate-600">Base de datos:</span>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="env"
          value="dev"
          checked={currentEnv === "dev"}
          onChange={() => onChange("dev")}
          className="text-blue-600"
        />
        <span
          className={`text-sm ${currentEnv === "dev" ? "font-semibold text-blue-600" : "text-slate-600"}`}
        >
          Dev
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="env"
          value="prod"
          checked={currentEnv === "prod"}
          onChange={() => onChange("prod")}
          className="text-red-600"
        />
        <span
          className={`text-sm ${currentEnv === "prod" ? "font-semibold text-red-600" : "text-slate-600"}`}
        >
          Prod
        </span>
      </label>
      {currentEnv === "prod" && (
        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
          ⚠️ PRODUCCIÓN
        </span>
      )}
    </div>
  );
}
