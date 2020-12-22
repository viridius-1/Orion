export function showErrorStyles(error) {
  if (error === "") {
    return "form-control";
  } else {
    return "form-control error-field";
  }
}

export function showLabel(key) {
  const label = `${key.split("_").join(" ")}`;

  if (key == "cpa_goal" || key == "budget") {
    return `${label} ($)`;
  } else {
    return `${label}`;
  }
}
