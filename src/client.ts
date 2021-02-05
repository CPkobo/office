import * as sapper from '@sapper/app';
import 'bulma/css/bulma.css'; // この行を追加

sapper.start({
	target: document.querySelector('#sapper')
});