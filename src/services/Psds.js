import http from "../http-common";


class Psds {
  constructor() {
  }


  logoutUser() {
    return http.post(`api/auth/logout` )
        .then(response => response.data)
  }

  loginUser(email, password) {
    return http.post(`api/auth/login`,{email, password} )
        .then(response => response.data)
  }

  async registerUser(lastName, firstName, fatherName, city, phoneNumber, email, password) {
    try {
      const response = await http.post('api/auth/registration',
          {'lastName': lastName, 'firstName': firstName, 'fatherName': fatherName, 'city': city,
          'phoneNumber': phoneNumber, 'email': email, 'password': password});
      console.log('Регистрация прошла успешно', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка регистрации пользователя', error);
    }
  }

  getGroupForUser() {
    return http.get(`api/groups`)
        .then(response => response.data)
  }

  selectGroup(groupId) {
    return http.put(`api/groups/${groupId}`)
        .then(response => response.data)
  }

  createGroup(name, description) {
    return http.post(`api/groups/moderator/group`,{name, description} )
        .then(response => response.data)
  }

  getListGroups() {
    return http.get(`api/groups/moderator`)
        .then(response => response.data)
  }

  getGroupById(groupId) {
    return http.get(`api/groups/moderator/${groupId}`)
        .then(response => response.data)
  }


  getGroupUserForModerator(userId) {
    return http.get(`api/groups/${userId}/moderator`)
        .then(response => response.data)
  }

  editGroupModerator(id, name, description) {
    return http.put(`api/groups/moderator`, {id, name, description })
        .then(response => response.data)
  }

  deleteGroup(groupId) {
    return http.delete(`api/groups/moderator/${groupId}`)
        .then(response => response.data);
  }


  getSpecialistProfile() {
    return http.get(`api/specialistProfiles`)
        .then(response => response.data)
  }


  getUsersForModerator() {
    return http.get(`api/moderator/users`)
        .then(response => response.data)
  }

  deleteUser(userId) {
    return http.delete(`api/moderator/users/${userId}`)
        .then(response => response.data);
  }


  createRoleInGroup(userId, roleId, groupId) {
    return http.post(`api/roleInGroup`,{userId, roleId, groupId} )
        .then(response => response.data)
  }

  getRolesInGroup() {
    return http.get(`api/roleInGroup`)
        .then(response => response.data)
  }


  createSpecialistProfiles(title, description) {
    return http.put(`api/specialistProfiles`, {title, description })
        .then(response => response.data)
  }

  editSpecialistProfiles(id, title, description, themes) {
    return http.put(`api/specialistProfiles`, {id, title, description, themes})
        .then(response => response.data)
  }

  deleteSpecialistProfiles(specialistProfileId) {
    return http.delete(`api/specialistProfiles/${specialistProfileId}`)
        .then(response => response.data);
  }

  createTheme(title, description) {
    return http.put(`api/themes`, {title, description })
        .then(response => response.data)
  }

  getAllThemes() {
    return http.get(`api/themes`)
        .then(response => response.data)
  }


  deleteThemes(themeId) {
    return http.delete(`/api/themes/${themeId}`)
        .then(response => response.data);
  }

  deleteUsersForGroup(groupId, userId) {
    return http.delete(`api/roleInGroup/${groupId}/${userId}`)
        .then(response => response.data);
  }

  getAllLessons() {
    return http.get(`api/lessons`)
        .then(response => response.data)
  }

  addLessonAndMaterialForTheme(themeId, lessonDTO, materialDTO) {
    return http.put(`api/themes/lesson`, {themeId, lessonDTO, materialDTO})
        .then(response => response.data)
  }

  deleteMaterial(materialId) {
    return http.delete(`api/materials/${materialId}`)
        .then(response => response.data);
  }

  deleteLesson(lessonId) {
    return http.delete(`api/lessons/${lessonId}`)
        .then(response => response.data);
  }

  getProfileDetails(id) {
    return http.get(`api/specialistProfiles/${id}`)
        .then(response => response.data)
  }

  getUsersForGroup(groupId) {
    return http.get(`api/roleInGroup/${groupId}`)
        .then(response => response.data)
  }

  getRoleUser() {
    return http.get(`api/roleInGroup/role`)
        .then(response => response.data)
  }

  getThemeDetails(id) {
    return http.get(`api/themes/${id}`)
        .then(response => response.data)
  }


  getLesson(id) {
    return http.get(`api/lessons/${id}`)
        .then(response => response.data)
  }
  getMaterials(id) {
    return http.get(`api/materials/${id}`)
        .then(response => response.data)
  }


  getListRelationUserDTO(groupId) {
    return http.get(`api/relation-users?groupId=${groupId}`)
        .then(response => response.data)
  }

  editMentorForGroup(mentorId, relationId) {
    return http.put(`api/relation-users`, {mentorId, relationId})
        .then(response => response.data)
  }

  getGrade(lessonId, userId) {
    return http.get(`api/grades/${lessonId}/${userId}`)
        .then(response => response.data)
  }
  getStudentIdByLink(LinkId) {
    return http.get(`api/moderator/users/link/${LinkId}`)
        .then(response => response.data)
  }

  getPlan(id) {
    return http.get(`api/plans/${id}`)
        .then(response => response.data)
  }
  getLink(userId, groupId) {
    return http.get(`api/relation-users/${userId}/${groupId}`)
        .then(response => response.data)
  }
  subscribeProfile(linkId, profileId) {
    return http.get(`api/plans/${linkId}/specialistProfiles/${profileId}`)
        .then(response => response.data)
  }

  getStudentsByMentor(userId, groupId) {
    return http.get(`api/groups/masters/students?userId=${userId}&groupId=${groupId}`)
        .then(response => response.data);
  }

  saveGrade(userId, lessonId, userGrade) {
    return http.put(`api/grades/${lessonId}/${userId}`, {grade: userGrade})
        .then(response => response.data)
  }
}
export default new Psds();
