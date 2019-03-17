Feature: User login

  Scenario: Login and see the app
    Given I navigate to the home page if I am not logged in
    Then I should see a login form
    When I put my username and password in
    And I submit the form
    Then I see the home page
