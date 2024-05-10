import Solo from './solo';
import Rockerboy from './rockerboy';
import Netrunner from './netrunner';
import Exec from './exec';

const table: Record<string, any> = {
    "Solo": Solo,
    "Rockerboy": Rockerboy,
    "Netrunner": Netrunner,
    "Exec": Exec
}

export default table;