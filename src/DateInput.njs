import Nullstack from 'nullstack';

class DateInput extends Nullstack {

  value = '';

  prepare({value}) {
    if(value) {
      this.value = Intl.DateTimeFormat('pt-BR', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(value);
    }
  }

  update({value}) {
    if(this.value.length == 10 || this.value.length == 0) {
      if(value) {
        const formatted = Intl.DateTimeFormat('pt-BR', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(value);
        if(formatted != this.value) {
          this.value = formatted;
        }
      }
    }
  }

  parse({event, name, index, onchange, endOfDay}) {
    let v = event.target.value.replace(/\D/g,'').slice(0, 10);
    if (v.length >= 5) {
      this.value = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      this.value = `${v.slice(0,2)}/${v.slice(2)}`;
    } else {
      this.value = v;
    }
    if(this.value.length == 0) {
      onchange && onchange({value: null, name, index});
    }
    if(this.value.length == 10) {
      const d = this.value.split('/');
      const date = new Date(Date.parse(`${d[1]}-${d[0]}-${d[2]}`));
      if(endOfDay) {
        date.setHours(23,59,59,999);
      }
      onchange && onchange({value: date, name, index});
    }
  }

  render({placeholder, name, class: klass}) {
    return <input type="tel" name={name} value={this.value} placeholder={placeholder} maxlength="10" oninput={this.parse} class={klass} />
  }

}

export default DateInput;