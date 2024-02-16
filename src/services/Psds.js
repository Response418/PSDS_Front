import http from "../http-common";
import axios from "axios";
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
    return http.post(`login`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  async loginUser(username, password) {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login',
          {'email': username, 'password': password});
      console.log('Успешный вход', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка входа', error);
    }
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

  async getGroupForUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Токен отсутствует');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('http://localhost:8080/api/groups', { headers });
      console.log('Получен список групп', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка групп', error);
    }
  }

  async createGroup(name, description) {
    try {
      const response = await axios.post('http://localhost:8080/api/groups/moderator/group',
          {'name': name, 'description': description});
      console.log('Группа добавлена', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка добавления группа', error);
    }
  }
  async getListGroups() {
    try {
      const response = await axios.get('http://localhost:8080/api/groups/moderator');
      console.log('Получен список групп', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка групп', error);
    }
  }

  async editGroupModerator(id, name, description) {
    try {
      const response = await axios.put('http://localhost:8080/api/groups/moderator',
          {'id': id, 'name': name, 'description': description});
      console.log('Данные группы изменены', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка в изминениях данных группы', error);
    }
  }

  async deleteGroup(groupId) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/groups/moderator/${groupId}`);
      console.log('Группа успешно удалена', response.data);
      await this.getListGroups();
    } catch (error) {
      console.error('Ошибка при удалении группы', error);
    }
  }


  async getUsersForModerator() {
    try {
      const response = await axios.get('http://localhost:8080/api/moderator/users');
      console.log('Получен список пользователей', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка пользователей', error);
    }
  }

  async deleteUser(userId) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/moderator/users/${userId}`);
      console.log('Пользователь успешно удален', response.data);
      await this.getUsersForModerator();
    } catch (error) {
      console.error('Ошибка при удалении пользователя', error);
    }
  }


  async createRoleInGroup(userId, roleId, groupId) {
    try {
      const response = await axios.post('http://localhost:8080/api/roleInGroup',
          {'userId': userId, 'roleId': roleId, 'groupId': groupId});
      console.log('Добавлена роль в группе', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка добавления роль в группе', error);
    }
  }

  async getRolesInGroup() {
    try {
      const response = await axios.get('http://localhost:8080/api/roleInGroup');
      console.log('Получены роли в группе', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении ролей в группе', error);
    }
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
