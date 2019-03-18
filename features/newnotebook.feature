@run_this
Feature: New Notebook

  Scenario Outline: Add a new notebook
    Given I am logged in
    When I click the new notebook button
    Then I should see the notebook modal
    When I type "<title>" into the title field
    And I submit the new notebook form
    Then I should see the new notebook with title "<title>" on the homepage

    Examples:
      |title|
      |React post|
