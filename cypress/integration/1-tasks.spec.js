// 1-tasks.spec.js created with Cypress
///<reference types="Cypress" />
import { faker } from "@faker-js/faker";

let taskTitle = faker.lorem.sentence();
let taskDesc = faker.lorem.paragraph();
let colorPosition = faker.datatype.number({
  min: 0,
  max: 5,
});

before(() => {
  cy.visit("/");
});

describe("Tasks create tests", () => {
  it("Should successfully click Create button", () => {
    cy.get('[data-cy="create-btn"]').click();
  });

  it("Create task form should be visible", () => {
    cy.get('[data-cy="task-title-form"]').should("be.visible");
    cy.get('[data-cy="task-title-input"]').should("be.visible");
    cy.get('[data-cy="task-desc-title-form"]').should("be.visible");
    cy.get('[data-cy="task-desc-textarea"]').should("be.visible");
    cy.get('[data-cy="background-color-orange"]').should("be.visible");
    cy.get('[data-cy="background-color-red"]').should("be.visible");
    cy.get('[data-cy="background-color-yellow"]').should("be.visible");
    cy.get('[data-cy="background-color-blue"]').should("be.visible");
    cy.get('[data-cy="background-color-purple"]').should("be.visible");
    cy.get('[data-cy="background-color-green"]').should("be.visible");
    cy.get('[data-cy="colors-container"]').children().should("have.length", 6);
    cy.get('[data-cy="create-task-btn"]').should("be.visible");
  });

  it("Should fill up the task form", () => {
    cy.get('[data-cy="task-title-input"]').type(taskTitle);
    cy.get('[data-cy="task-desc-textarea"]').type(taskDesc);
    cy.get('[data-cy="colors-container"]').children().eq(colorPosition).click();
  });

  it("Should successfully create a new task", () => {
    cy.get('[data-cy="create-task-btn"]').click();
  });

  it("Should verify the newly created task", () => {
    cy.get('[data-cy="saved-task-title"]').first().should("be.visible");
    cy.get('[data-cy="saved-task-title"]')
      .first()
      .should("have.value", taskTitle);
  });

  it("Should mark new task as done", () => {
    cy.get('[data-cy="mark-done-checkbox"]').first().should("be.visible");
    cy.get('[data-cy="mark-done-checkbox"]').first().click();
  });

  it("Should verify the latest Done task", () => {
    cy.get('[data-cy="task-item-label"]').should("be.visible");
    cy.get('[data-cy="task-item-label"]').should("contain", "Done");
  });

  it("Should add 3 more tasks", () => {
    cy.createTask();
    cy.createTask();
    cy.createTask();
  });
});

describe("Tasks update tests", () => {
  it("Should double click latest task title to enable input", () => {
    cy.get('[data-cy="tasks-list"]').should("be.visible");
    cy.get('[data-cy="tasks-list"]').children().eq(0).should("be.visible");
    cy.get('[data-cy="tasks-list"]').children().eq(0).dblclick();
  });

  it("Should clear and update the latest task", () => {
    cy.get('[data-cy="saved-task-title"]').first().clear();
    cy.get('[data-cy="saved-task-title"]')
      .first()
      .type(`Updated ${faker.lorem.sentence()}{enter}`);
  });
});

describe("Tasks show / hide tests", () => {
  it("Should hide the tasks list", () => {
    cy.get('[data-cy="show-hide-btn"]').click();
    cy.get('[data-cy="tasks-list"]').should("not.be.visible");
  });

  it("Should show the tasks list", () => {
    cy.get('[data-cy="show-hide-btn"]').should("contain", "Show");
    cy.get('[data-cy="show-hide-btn"]').click();
    cy.get('[data-cy="tasks-list"]').should("be.visible");
  });
});

describe("Tasks list filter tests", () => {
  it("Should show the completed tasks", () => {
    cy.get('[data-cy="completed-btn"]').click();
    cy.get('[data-cy="completed-tasks-count"]')
      .invoke("text")
      .then((val) => {
        let completedCount = val;
        cy.wrap(completedCount[0]).as("completedCount");
      });
    cy.get("@completedCount").then((ccount) => {
      cy.get('[data-cy="tasks-list"]').children().should("have.length", ccount);
    });
  });

  it("Should show the active tasks", () => {
    cy.get('[data-cy="active-btn"]').click();
    cy.get('[data-cy="active-tasks-count"]')
      .invoke("text")
      .then((val) => {
        let activeCount = val;
        cy.wrap(activeCount[0]).as("activeCount");
      });
    cy.get("@activeCount").then((acount) => {
      cy.get('[data-cy="tasks-list"]').children().should("have.length", acount);
    });
  });

  it("Should show all the tasks", () => {
    cy.get('[data-cy="all-btn"]').click();
    cy.get('[data-cy="total-tasks-count"]')
      .invoke("text")
      .then((val) => {
        let totalCount = val;
        cy.wrap(totalCount[0]).as("totalCount");
      });
    cy.get("@totalCount").then((tcount) => {
      cy.get('[data-cy="tasks-list"]').children().should("have.length", tcount);
    });
  });
});

describe("Tasks list clear tests", () => {
  it("Should clear the completed tasks", () => {
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="completed-tasks-count"]')
      .invoke("text")
      .should("eq", "0");
  });
});
