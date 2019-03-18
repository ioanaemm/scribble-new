Feature: Homepage
  The homepage gives users the ability to add new notebooks and new notes
  Background:
    Given I am logged in

  Scenario Outline: Add a new notebook
    When I click the ".add-notebook" button
    Then I should see the ".modal-notebook" element
    When I type "<title>" into the title field of the notebook modal
    And I submit the new notebook form
    Then I should see the new notebook with title "<title>" on the homepage

    Examples:
      |title|
      |React post|

  @run_this
  Scenario Outline: Go to notebook page
    When I click the notebook with title "<title>"
    Then I am taken to the "/notebooks/" page
    And the notebook page contains the title "<title>"

    Examples:
      |title|
      |React post|
