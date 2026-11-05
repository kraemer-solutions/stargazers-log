const list = document.querySelector("#repository-list");
const status = document.querySelector("#status");
const count = document.querySelector("#repository-count");

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";

  const link = document.createElement("a");
  link.className = "repository-link";
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.repository;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const date = document.createElement("time");
  date.className = "starred-date";
  date.dateTime = repository.starred_at;
  date.textContent = `Starred ${new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(repository.starred_at))}`;

  item.append(link, description, date);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    list.replaceChildren(...repositories.map(renderRepository));
    count.textContent = `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"}`;
    status.textContent = repositories.length ? "" : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Repositories could not be loaded. Open this page through a local web server and try again.";
    console.error("Unable to load starred repositories:", error);
  }
}

loadRepositories();