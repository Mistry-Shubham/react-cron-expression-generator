import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' assert { type: 'json' };

const input = 'src/index.ts';

function createExternal(dependencies) {
	return Object.keys(dependencies).flatMap(
		(dependency) => new RegExp(`^${dependency}(\\/.+)?`)
	);
}

const external = createExternal(packageJson.peerDependencies);

export default [
	{
		input,
		output: {
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		plugins: [typescript(), terser(), postcss()],
		external,
	},
	{
		input,
		output: {
			file: packageJson.module,
			format: 'es',
			sourcemap: true,
		},
		plugins: [typescript(), terser(), postcss()],
		external,
	},
	{
		input,
		output: {
			file: packageJson.types,
			format: 'es',
		},
		plugins: [dts()],
		external: [...external, /\.css$/],
	},
];
