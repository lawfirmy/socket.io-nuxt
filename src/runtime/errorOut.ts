import boxen from 'boxen';
import chalk from 'chalk';

export default function (error: string) {
    console.log(
        boxen(
            chalk.red(error),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'red',
            }
        )
    );
}
