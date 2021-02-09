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

  parse({event, onchange, endOfDay, beginningOfDay}) {
    let v = event.target.value.replace(/\D/g,'').slice(0, 10);
    if (v.length >= 5) {
      this.value = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      this.value = `${v.slice(0,2)}/${v.slice(2)}`;
    } else {
      this.value = v;
    }
    if(this.value.length == 0) {
      onchange && onchange({value: null});
    }
    if(this.value.length == 10) {
      const d = this.value.split('/');
      const date = new Date(Date.parse(`${d[1]}-${d[0]}-${d[2]}`));
      if(isNaN(date)) {
        onchange && onchange({value: null});
        this.value = '';
      } else {
        if(endOfDay) {
          date.setHours(23,59,59,999);
        }
        if(beginningOfDay) {
          date.setHours(0,0,0,0);
        }
        onchange && onchange({value: date});
      }
    }
  }

  render({name, placeholder, class: klass, id, disabled, data}) {
    return (
      <input
        type="tel"
        name={name}
        value={this.value}
        placeholder={placeholder}
        maxlength={10}
        oninput={this.parse}
        class={klass}
        id={id}
        disabled={disabled}
        data={data}
      />
    )
  }

}

export default DateInput;