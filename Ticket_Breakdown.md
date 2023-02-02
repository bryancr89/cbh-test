# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Informed guesses (Assumptions)

1. We already have a front-end/back-end where the user can perform CRUD operations on the agent's data.
    1. We use a RESTful API
2. An agent can work on two different facilities.
    1. This means that the DB relationship between Facilities and Agent is many-to-many.
3. Since we don’t a clear definition of what effort means, I’d estimate them in time.
4. Also as part of ticket the developer needs to include tests.

## Ticket #1

**Title:** Update the API to support custom id field to agents

**Description:** As a facility user, I’d like to assign custom ids to the agents for visualizing them in the reports.

**Acceptance criteria:**

- If not provided, by default the custom id is going to be an empty string.
- Character length limitations:
    - There is no min length required.
    - Must have a max length of 16.
- The custom id must be unique, two agents can’t have the same custom id.
- Allow creating a new agent with a custom id
- Allow updating the custom id from an existing agent
- Error messages:
    - If the custom id is already in use: “Custom Id already in use.”
    - If the custom id is bigger than 16 chars: “Custom Id cannot exceed 16 characters long.”
    - If something else happened: “Something wrong happen, please try later.”

**Estimate:** 2 working days

**Implementation details:**

- Create a migration script for adding the new field in the agent table.
    - By default the value is empty.
    - Do not allow null values. (since it’s a string value)
- Custom id is an optional field, if it’s not provided the value is an empty string.
- Modify the POST/PUT/PATCH endpoints to support the operations.

## Ticket #2

**Title:** Update the UP to support custom id field to agents

**Description:** As a facility user, I’d like to assign custom ids to the agents for visualizing them in the reports.

**Acceptance criteria:**

- Update the create an edit page to include the new field.
- Character length limitations:
    - There is no min length required.
    - Must have a max length of 16.
- The submit button would be enabled by default.
- The submit button would be disabled if the user typed more than 16 characters.
- Error messages:
    - If the user types more than 16 characters:
        - Show the message “Custom Id cannot exceed 16 characters long.”
    - Upon submission, if there is an error show the message from the API.

**Estimate:** 2 working days

**Dependencies:** This ticket depends on Ticket #1

**Implementation details:**

- Update the UI & the calls for the different API requests.
- Add tests for the different scenarios