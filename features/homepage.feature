Feature: Homepage
  The homepage gives users the ability to add new notebooks and new notes

  Scenario Outline: Add a new notebook
    Given I am logged in
    When I click the ".add-notebook" button
    Then I should see the ".modal-notebook" element
    When I type "<title>" into the title field of the notebook modal
    And I submit the new notebook form
    Then I should see the new notebook with title "<title>" on the homepage

    Examples:
      |title|
      |React post|
