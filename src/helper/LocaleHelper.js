import {I18n} from 'i18n-js';
import english from '../translations/english.json';
import spanish from '../translations/spanish.json';
import french from '../translations/french.json';
import italian from '../translations/italian.json';

const i18n = new I18n({
  ...english,
  ...french,
  ...italian,
  ...spanish,
});

i18n.locale = 'english';

export default i18n;
