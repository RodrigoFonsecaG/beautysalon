import Appointment  from './modules/appointment-form.js';

const appointment = new Appointment('.card', 'select[name="uf"]', 'select[name="city"]');
appointment.init();

import AppointmentFuncionamento from './modules/appointment-funcionamento.js';
AppointmentFuncionamento();

