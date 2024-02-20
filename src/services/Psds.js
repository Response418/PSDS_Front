import http from "../http-common";
import axios from "axios";
import data from "bootstrap/js/src/dom/data.js";
// import * as http from "http";
// import data from "bootstrap/js/src/dom/data.js";
// import * as console from "console";
// import response from "core-js/internals/is-forced.js";
// import * as console from "console";
// import {error} from "vue-resource/src/util.js";



class Psds {
  constructor() {
  }

  login(data) {
    return http.post(`api/auth/login`, data)
  }

  // async loginUser(username, password) {
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/auth/login',
  //         {'email': username, 'password': password});
  //     console.log('Успешный вход', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Ошибка входа', error);
  //   }
  // }

  loginUser(email, password) {
    return http.post(`api/auth/login`,{email, password} )
        .then(response => response.data)
  }


  async registerUser(lastName, firstName, fatherName, city, phoneNumber, email, password) {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/registration',
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

  // getProfileDetails(id) {
  //   return http.get(`api/specialistProfiles/${id}`)
  //       .then(response => response.data)
  // }

  getListGroups() {
    return http.get(`api/groups/moderator`)
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


  async getAllLessons() {
    try {
      const response = await axios.get('http://localhost:8080/api/lessons');
      console.log('Получены все уроки', response.data);
      return response.data;
    } catch (error) {
      console.error('Уроки не получены', error);
    }
  }

  getProfileDetails(id) {
    return http.get(`api/specialistProfiles/${id}`)
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


  getListRelationUserDTO() {
    return http.get(`api/relation-users`)
        .then(response => response.data)
  }


  getGrade(lessonId, LinkId) {
    return http.get(`api/grades/${lessonId}/${LinkId}`)
        .then(response => response.data)
  }
  getUserIdByLink(LinkId) {
    return http.get(`users/link/${LinkId}`)
        .then(response => response.data)
  }
  getListLinkByUserId(userId) {
    return http.get(`api/relation-users/${userId}`)
        .then(response => response.data)
  }
  getDataSession() {
    return http.get(`users/data/session`)
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
  getStudentsByMentor() {
    return http.get(`api/groups/masters/students`)
        .then(response => response.data)
  }
  saveGrade(linkId, lessonId, userGrade) {
    return http.put(`api/grades/${lessonId}/${linkId}`, {grade: userGrade})
        .then(response => response.data)
  }
  // async getSpecialistProfile() {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       console.error('Токен отсутствует');
  //       return;
  //     }
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //
  //     const response = await axios.get('http://localhost:8080/api/specialistProfiles', {headers});
  //     console.log('Получены все профили специалиста', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Профили не получены', error);
  //   }
  //
  // }

  CreateUser(formData) {
    return http.post(`/users/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      enctype: 'multipart/form-data'
    });
  }
  Authentication(data) {
    return http.post(`/users`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isAuthenticated(data) {
    return http.post(`/users/isAuthenticated`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  findUserById(data) {
    return http.post(`/users/findOneId`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  findUserByEmail(data) {
    return http.post(`/users/findOneEmail`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updateUser(data) {
    return http.post(`/users/update`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  createCompetition(formData) {
    return http.post('/competition/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      enctype: 'multipart/form-data'
    });
  }
  updateCompetition(formData) {
    return http.post('/competition/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      enctype: 'multipart/form-data'
    });
  }
  updateModel(formData) {
    return http.post('/model/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      enctype: 'multipart/form-data'
    });
  }
  createCriteria(data) {
    return http.post(`/competition/createCriteria`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getCriteria(data) {
    return http.post(`/competition/getCriteria`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


getWinner(data) {
    return http.post(`/competition/getWinner`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  sendScore(data) {
    return http.post(`/model/sendScore`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getCountModel(data) {
    return http.post(`/model/getCountModel`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getScore(data) {
    return http.post(`/model/getScore`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  createJudge(data) {
    return http.post(`/competition/createJudge`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  deleteJudge(data) {
    return http.post(`/competition/deleteJudge`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  approvalJudge(data) {
    return http.post(`/competition/approvalJudge`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getCompetition(data) {
    return http.post(`/competition/getCompetition`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getCompetitionEnd(data) {
    return http.post(`/competition/getCompetitionEnd`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getOneCompetition(data) {
    return http.post(`/competition/getOneCompetition`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  GetOneModel(data) {
    return http.post(`/model/GetOneModel`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  deleteCompetition(data) {
    return http.post(`/competition/deleteCompetition`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  deleteModel(data) {
    return http.post(`/competition/deleteModel`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  GetModelImages(data) {
    return http.post(`/model/GetModelImages`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  createModel(data) {
    return http.post(`/model/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  signIn(data) {
    return http.post(`/sign-in`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  signOut(data) {
    return http.post(`/sign-out`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isAdmin(data) {
    return http.post(`/isAdmin`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isJudge(data) {
    return http.post(`/isJudge`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isOrganizer(data) {
    return http.post(`/isOrganizer`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  isParticipant(data) {
    return http.post(`/isParticipant`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  GetOrganizers(data) {
    return http.post(`/competition/GetOrganizers`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  GetJudges(data) {
    return http.post(`/competition/GetJudges`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  GetParticipants(data) {
    return http.post(`/competition/GetParticipants`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
export default new Psds();
