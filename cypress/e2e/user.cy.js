import users from "../fixtures/users";
import update from "../fixtures/update";

describe("user API", () => {
  it("create user", () => {
    cy.createUser(users.filter((user) => user.username == "PetyaP"));
    cy.getUser("PetyaP");
  });

  it("user modification", () => {
    cy.createUser(users.filter((user) => user.username == "MashaEgorova"));
    cy.login("MashaEgorova", "poiuyt");
    cy.updateUser(
      "MashaEgorova",
      update.find((body) => body.username == "MashaEgorova")
    );
  });

  it("delete user", () => {
    cy.createUser(users.filter((user) => user.username == "BorisNogov"));
    cy.getUser("BorisNogov");
    cy.login("BorisNogov", "eryuy23");
    cy.deleteUser("BorisNogov");
    cy.userNotFound("BorisNogov");    
  });
});
