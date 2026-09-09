"use client";

import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
  title?: string;
  activeColor?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  size = "md",
  title,
  activeColor,
}: ToggleSwitchProps) {
  return (
    <label
      className={`toggle-wrapper ${size === "sm" ? "toggle-sm" : ""}`}
      title={title}
    >
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className="slider"
        style={checked && activeColor ? { backgroundColor: activeColor } : undefined}
      />
    </label>
  );
}
