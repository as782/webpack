
import _ from 'lodash';
import { join } from 'lodash-es';
const print = () =>{
    console.log(' i can print "hello world" !',_.join(['hello','world'],' '));
    console.log(' i can print "hello world" !',join(['hello','world'],' '));
    alert('hello wsorld');
    
}
 
export default print