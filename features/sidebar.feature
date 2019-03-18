Feature: Sidebar
  Background:
    Given I am logged in

  Scenario: Notebook button
    When I click the ".notebook-icon" button on the sidebar
    Then I am taken to the "/notebooks" page

  Scenario: Note button
    When I click the ".note-icon" button on the sidebar
    Then I am taken to the "/note" page
