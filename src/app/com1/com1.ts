import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-com1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './com1.html',
  styleUrls: ['./com1.css']
})
export class Com1 {
  // internal expression used for evaluation (JS-friendly: uses / and *)
  internal = '';
  // display string shown in the UI (prettified, uses × and ÷)
  display = '0';
  // flag set when we just evaluated a result; next digit should start a new expression
  justEvaluated = false;

  // append a digit (0-9)
  pressDigit(d: string) {
    // if we just got a result and the user types a digit, start a new expression
    if (this.justEvaluated) {
      this.internal = d === '0' ? '0' : d;
      this.justEvaluated = false;
      this.display = this.prettify(this.internal) || '0';
      return;
    }

    // avoid multiple leading zeros at the very start of the expression
    if (this.internal === '0' && d === '0') return;

    if (this.internal === '0' && d !== '0') {
      this.internal = d;
    } else {
      this.internal += d;
    }

    this.display = this.prettify(this.internal) || '0';
  }

  // append decimal point
  pressDecimal() {
    // don't allow multiple decimals in the last number segment
    const parts = this.internal.split(/[^0-9.]+/);
    const last = parts[parts.length - 1] || '';
    if (last.includes('.')) return;

    if (this.justEvaluated) {
      // start fresh after a result
      this.internal = '0.';
      this.justEvaluated = false;
    } else if (this.internal === '' || /[+\-*/:]$/.test(this.internal)) {
      // start a new decimal number
      this.internal += '0.';
    } else {
      this.internal += '.';
    }

    this.display = this.prettify(this.internal) || '0';
  }

  // handle operator buttons (+ - * / or : )
  pressOperator(op: string) {
    // map some inputs to JS-friendly operators
    const mapped = op === ':' ? '/' : op;

    if (this.justEvaluated) {
      // if previous action was evaluation, start a new expression using the result
      // keep the displayed result (which is numeric) and append the operator
      this.justEvaluated = false;
      // internal currently holds the numeric string of the result
    }

    // if internal empty and user presses -, allow negative start
    if (this.internal === '' && mapped === '-') {
      this.internal = '-';
      this.display = this.prettify(this.internal);
      return;
    }

    // replace trailing operator if user presses a different operator
    if (/[+\-*/:]$/.test(this.internal)) {
      this.internal = this.internal.slice(0, -1) + mapped;
    } else {
      this.internal += mapped;
    }

    this.display = this.prettify(this.internal) || '0';
  }

  // clear everything
  clear() {
    this.internal = '';
    this.display = '0';
    this.justEvaluated = false;
  }

  // backspace / delete last character
  backspace() {
    if (this.justEvaluated) {
      // if we backspace right after evaluation, clear everything
      this.clear();
      return;
    }

    if (this.internal.length <= 1) {
      this.clear();
      return;
    }

    this.internal = this.internal.slice(0, -1);
    this.display = this.prettify(this.internal) || '0';
  }

  // evaluate the expression safely
  pressEqual() {
    if (this.internal === '') return;

    // normalize input: allow ':' as division, keep arithmetic characters
    let expr = this.internal.replace(/:/g, '/');

    // basic validation: only allow digits, operators, parentheses, decimal and spaces
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      this.display = 'Error';
      this.internal = '';
      return;
    }

    try {
      // evaluate using Function for a local scope and return value
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expr})`)();
      // format result: trim long floating numbers
      const formatted = typeof result === 'number' && !Number.isInteger(result)
        ? parseFloat(result.toPrecision(12)).toString()
        : String(result);
      this.display = formatted;
      this.internal = formatted;
      this.justEvaluated = true;
    } catch (e) {
      this.display = 'Error';
      this.internal = '';
      this.justEvaluated = false;
    }
  }

  // convert internal expression to a prettier display string
  prettify(s: string) {
    if (!s) return '';
    // replace JS operators with visual symbols for the display
    return s.replace(/\*/g, '×').replace(/\//g, '÷');
  }
}
