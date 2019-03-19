Feature: Note page
  Background:
    Given I am logged in

  @me
  Scenario Outline:
    When I go to the note with id "<noteId>"
    And I replace the note body with "<noteBody>"
    And I save the note
    And I go to the note with id "<noteId>"
    Then the note body editor says "<noteBody>"

    Examples:
      |        noteId          |    noteBody        |
      |5c801cb0be41203a155452d8|    cucumber        |
      |5c801cb0be41203a155452d8|    another test    |
