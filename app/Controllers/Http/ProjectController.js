'use strict'

const Project = use("App/Models/Project");
const AuthorizationService = use("App/Services/AuthorizationService");
/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   */
  async index ({ request, response, view, auth }) {
    const user = await auth.getUser();
    return await user.projects().fetch();
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   */
  async create ({ request, response, view, auth }) {
    const user = await auth.getUser();
    const {title} = request.all();
    const project = new Project();
    project.fill({
      title,
    });
    await user.projects().save(project);
    return project;
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   */
  async update ({ params, request, response, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermission(project, user);
    project.merge(request.only('title'));
    await project.save();
    return project;
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   */
  async destroy ({ params, request, response, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermission(project, user);
    await project.delete();
    return project;
  }
}

module.exports = ProjectController
