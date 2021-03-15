import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import get_leader_board, models
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
SCORE = 100

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'naman',
                # KEY_EXPECTED: [INITIAL_USERNAME, 'naman'],
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100 },
            },
            {
                KEY_INPUT: 'naman',
                # KEY_EXPECTED: [INITIAL_USERNAME, 'naman'],
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100 },
                
            },
            {
                KEY_INPUT: 'naman',
                # KEY_EXPECTED: [INITIAL_USERNAME, 'naman'],
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100 },
                
            },
        ]
        
        # initial_person = models.Person(username=INITIAL_USERNAME, email='{0}@stuff.com'.format(INITIAL_USERNAME))
        initial_person = models.Players(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = {initial_person.username:initial_person.score}
    
    # def mocked_db_session_add(self, username):
    #     self.initial_db_mock.append(username)
    
    # def mocked_db_session_commit(self):
    #     pass
    
    def mocked_person_query_all(self):
    
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('models.Players.query') as mocked_query:
                mocked_query.order_by.all = self.mocked_person_query_all()
                
                print(self.initial_db_mock)
                actual_result = get_leader_board()
                print(actual_result)
                expected_result = test[KEY_EXPECTED]
                print(expected_result)
                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result, expected_result)
                
            
            # with patch('app.db.session.add', self.mocked_db_session_add):
            #     with patch('app.db.session.commit', self.mocked_db_session_commit):
            #         with patch('models.Person.query') as mocked_query:
            #             mocked_query.all = self.mocked_person_query_all
    
            #             print(self.initial_db_mock)
            #             actual_result = add_user(test[KEY_INPUT], 100)
            #             print(actual_result)
            #             expected_result = test[KEY_EXPECTED]
            #             print(self.initial_db_mock)
            #             print(expected_result)
                        
            #             self.assertEqual(len(actual_result), len(expected_result))
            #             self.assertEqual(actual_result[1], expected_result[1])


if __name__ == '__main__':
    unittest.main()