
# Nullstack Date Input

Simple input that converts user formatted dates into a date object and the other way around.

## Install

```bash
npm install --save nullstack-date-input
```

## Usage with one way binding

```jsx
import Nullstack from 'nullstack';
import DateInput from 'nullstack-date-input';

class Application extends Nullstack {

  deadline = new Date();

  updateDeadline({value}) {
    this.deadline = value;
  }

  render() {
    return (
      <DateInput name="deadline" value={this.deadline} onchange={this.updateDeadline} />
    )
  }

}

export default Application;
```

## Usage with two way binding

```jsx
import Nullstack from 'nullstack';
import DateInput from 'nullstack-date-input';

class Application extends Nullstack {

  deadline = new Date();

  render() {
    return (
      <DateInput bind={this.deadline} />
    )
  }

}

export default Application;
```

## Setting the hours

The default hour is the start of the day

You can override it by passing true to the endOfDay attribute

```jsx
<DateInput bind={this.deadline} endOfDay />
```

## Customization

You can customize the following attributes:

- id
- class
- placeholder
- disabled
- data-*

## Caveats

Currently this component only works with the DD/MM/YYYY format

## License

Nullstack Date Input is released under the [MIT License](https://opensource.org/licenses/MIT).