@run_this
Feature: Search

  Scenario Outline: Search for an item
    Given I am logged in
    When I search for "<searchTerm>"
    Then I should be taken to the search results page for "<searchTerm>"

    Examples:
      |searchTerm|
      |React|
