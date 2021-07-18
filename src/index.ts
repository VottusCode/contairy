/**
 * Contairy - Simple Service Container for Node.js written in TypeScript.
 * Copyright (C) 2021 Mia Vottus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import Container from "./container";

/**
 * The main Container instance that's accessible across
 * the application and that the hooks will use.
 */
let $container: Container;

/**
 * Hook returning the main container registered by `setContainer`
 * (or the default instance created at start if a different one was not set).
 *
 * @returns The main container.
 */
const useContainer = (): Container => $container;

/**
 * Registers services into the main container.
 *
 * Keys are used as service identifier,
 * values are used as services.
 *
 * @param {Record<string, unknown>} Services to register.
 */
const registerContainerServices = (
  services: Record<string, unknown>
): Container => $container.register(services);

/**
 * Returns all registered services in the main container.
 */
const useServices = <T = Record<string, unknown>>(): T =>
  $container._services as T;

/**
 * Set a main container instance. This instance will be used
 * in all hooks and will become available across the application.
 */
const setContainer = (container: Container) => ($container = container);

/**
 * Create a new instance on start. This instance can later be changed by calling
 * `setContainer`.
 */
setContainer(new Container());

export { Container, useContainer, registerContainerServices, useServices };
