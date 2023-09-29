import users from "../fixtures/users";

Cypress.Commands.add("createUser", (body) => {
  cy.request("POST", "/user/createWithArray", body).then((response) => {
    expect(response.status).be.eq(200);
    expect(response.body).be.eql({
      code: 200,
      type: "unknown",
      message: "ok",
    });
  });
});

Cypress.Commands.add("getUser", (username) => {
  cy.request(`/user/${username}`).then((response) => {
    expect(response.status).be.eq(200);
    expect(response.body).be.eql(
      users.find((user) => user.username == username)
    );
  });
});

Cypress.Commands.add("updateUser", (username, body) => {
  cy.request("PUT", `/user/${username}`, body).then((response) => {
    expect(response.status).be.eq(200);
    expect(response.body).be.eql({
      code: 200,
      type: "unknown",
      message: "2000",
    });
  });
  cy.request(`/user/${username}`).then((response) => {
    expect(response.status).be.eq(200);
    expect(response.body).be.eql(body);
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.request(`/user/login?username=${username}&password=${password}`).then(
    (response) => {
      expect(response.status).be.eq(200);
    }
  );
});

Cypress.Commands.add("userNotFound", (username) => {
  cy.request({
    url: `/user/${username}`,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).be.eq(404);
    expect(response.body).be.eql({
      code: 1,
      type: "error",
      message: "User not found",
    });
  });
});

Cypress.Commands.add("deleteUser", (username) => {
  cy.request("DELETE", `/user/${username}`).then((response) => {
    expect(response.status).be.eq(200);
    expect(response.body).be.eql({
      code: 200,
      type: "unknown",
      message: username,
    });
  });
});
