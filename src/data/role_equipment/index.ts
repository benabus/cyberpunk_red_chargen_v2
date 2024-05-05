import Solo from './solo';
import Rockerboy from './rockerboy';
import Netrunner from './netrunner';

const table: Record<string, any> = {
    "Solo": Solo,
    "Rockerboy": Rockerboy,
    "Netrunner": Netrunner,
}

export default table;