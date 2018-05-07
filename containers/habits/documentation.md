# HabitsContainer

This container uses `unstated` for state management.

# State

## habits

* An object containing all of the habits that have been made.
* Each habit contains a `title`, `timesPerDay` required to complete, and `frequency` containing an array of days the habit must be performed.

```javascript
habits: {
  '0': {
    title: 'Do this every monday and wednesday!',
    timesPerDay: 1,
    frequency: [DAYS.MONDAY, DAYS.WEDNESDAY],
  },
  '1': {
    title: 'Do this twice every Friday!',
    timesPerDay: 2,
    frequency: [DAYS.FRIDAY],
  },
}
```

## active

* An object containing the current habits that must be completed today.
* Each habit contains a `timesRemainingToday`, which starts at the `timesPerDay` value from the `habit` state.
* The state is identified by a `STATUS.ACTIVE` constant.

```javascript
[STATUS.ACTIVE]: {
  '0': {
    timesRemainingToday: 1,
  },
}
```

## history

* An object containing all the habits that have either been completed or failed.
* Each habit contains a `completed` property, which holds an array containing booleans on if the habit was successfully completed each time it was active.
* The state is identified by a `STATUS.HISTORY` constant.

```javascript
[STATUS.HISTORY]: {
  '0': {
    completed: [true, true, false, true],
  },
}
```

# Functions

`add({ title, frequency, timesPerDay })`

* Adds a habit to the container and sets it active if today is a selected day to perform the habit.

`remove(id)`

* Removes a habit and habit's history using the habit's `id`.

`perform(id)`

* Performs the habit.
* If the habit is finished for the day then it is taken off the `active` list and a completion is added to the `history`.

`getHistory(id)`

* Returns the history of a single habit based on the `id`.

`getIterable({ filter })`

* Uses the `filter` to return all the information about the habits.

`updateActive()`

* Updates the `active` habits to the current days habits.
* If any habits are still in the `active` list before the update, the habits are added to the history as incomplete.
